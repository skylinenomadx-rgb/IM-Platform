const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// =========================================================================
// SYSTEM STATE MACHINE & RELATIONAL DATABASE SIMULATION
// =========================================================================

// Simulated User Table - No valid passwords are saved to force exploitation
const mockUserDatabase = [
  { id: 1, username: 'op-admin-04', role: 'cluster_master' }
];

// Active Server Session Store to track validated tokens across endpoints
const activeAdminSessions = new Set();

// Hard progressive gates preventing players from skipping intermediate stages
const systemLabState = {
  stage1_cleared: false,
  stage2_manipulated: false,
  target_destination_path: '/var/log/identity_sync/telemetry/',
  uploaded_payloads: {} // Stores uploaded simulated files in memory
};

// Middleware: Strict Authorization Gate
// Completely blocks directory fuzzers or direct endpoint targeting
const enforceSessionToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Access Denied: Connection mapping lacks authorization token headers.' });
  }

  const sessionToken = authHeader.split(' ')[1];
  if (!activeAdminSessions.has(sessionToken)) {
    return res.status(403).json({ message: 'Access Denied: Session token validation signature expired or missing.' });
  }
  next();
};

// =========================================================================
// STAGE 1: ENTRY PERIMETER GATEWAY (SQL INJECTION)
// =========================================================================
app.post('/api/v1/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ authenticated: false, message: 'Missing operator credential arrays.' });
  }

  // SYSTEM FLAW: Raw string concatenation vulnerable to SQL injection breakouts
  const targetQuery = `SELECT * FROM operators WHERE username = '${username}' AND password = '${password}'`;
  console.log(`[DATABASE EXECUTION LOG]: ${targetQuery}`);

  // Simulating SQL Syntax Breakout Evaluation (e.g., admin' -- or '1'='1)
  const isSqlInjectionBypass = username.includes("'") || username.includes("--") || password.includes("'");
  
  if (isSqlInjectionBypass) {
    // Generate an authentic cryptographically signed session key
    const token = crypto.randomBytes(32).toString('hex');
    activeAdminSessions.add(token);
    systemLabState.stage1_cleared = true;

    return res.status(200).json({
      authenticated: true,
      message: 'Authentication override successful via active database syntax manipulation.',
      token: token,
      redirect_path: '/internal_operations'
    });
  }

  return res.status(401).json({
    authenticated: false,
    message: 'Access Denied: Invalid operator signatures matching system directories.'
  });
});

// =========================================================================
// STAGE 2 & 3: ROUTING SYSTEM PARAMETERS (DATA MANIPULATION / IDOR)
// =========================================================================
app.post('/api/v1/config/routing', enforceSessionToken, (req, res) => {
  const { config_target, value } = req.body;

  if (!config_target || !value) {
    return res.status(400).json({ message: 'Missing parameters: config_target and value fields required.' });
  }

  // SYSTEM FLAW: Server blindly trusts incoming paths without canonicalization filtering
  if (config_target === 'storage_path') {
    systemLabState.target_destination_path = value;
    systemLabState.stage2_manipulated = true;

    return res.status(200).json({
      message: 'Global operational target directory updated successfully.',
      current_path: systemLabState.target_destination_path
    });
  }

  return res.status(400).json({ message: 'Unknown configuration property context target.' });
});

// =========================================================================
// STAGE 4: ARBITRARY PACKAGE SYNCHRONIZATION (FILE UPLOAD GATED BY STAGE 2)
// =========================================================================
app.post('/api/v1/telemetry/upload', enforceSessionToken, (req, res) => {
  // PROGRESSIVE TIMING CHECK: Blocks file uploads unless Stage 2 path manipulation was done
  if (!systemLabState.stage2_manipulated) {
    return res.status(400).json({ message: 'Deployment Refused: Storage parameters unconfigured or out of boundary context.' });
  }

  const { filename, file_content } = req.body;
  if (!filename || !file_content) {
    return res.status(400).json({ message: 'Invalid payload: filename and file_content parameters required.' });
  }

  // Resolve virtual landing path based on modified system state settings
  const targetLandingZone = path.join(systemLabState.target_destination_path, filename);
  
  // Save simulated script file structure directly to session memory storage
  systemLabState.uploaded_payloads[targetLandingZone] = {
    content: file_content,
    uploaded_at: new Date().toISOString()
  };

  return res.status(200).json({
    status: 'synchronized',
    message: 'Module file package written successfully to target configuration path context.',
    saved_at: targetLandingZone
  });
});

// =========================================================================
// STAGE 5: SYSTEM TRIGGER GATEWAY (REMOTE CODE EXECUTION)
// =========================================================================
app.post('/api/v1/telemetry/execute', enforceSessionToken, (req, res) => {
  const { execution_path } = req.body;

  if (!execution_path) {
    return res.status(400).json({ message: 'Execution execution path parameter array missing.' });
  }

  // Check if target execution file path matches exactly where the file was uploaded in memory
  const targetedFile = systemLabState.uploaded_payloads[execution_path];

  if (!targetedFile) {
    return res.status(404).json({ message: `Execution Error: Core engine component at [${execution_path}] not found inside registered namespaces.` });
  }

  // Simulate command execution parsing if script tags exist
  if (targetedFile.content.includes('process.env') || targetedFile.content.includes('child_process')) {
    return res.status(200).json({
      execution_status: 'success',
      output: `[RCE ACTIVE]: Host completely compromised. Environment dump verification signature: FLAG{${crypto.createHash('md5').update(execution_path).digest('hex')}}`
    });
  }

  return res.status(200).json({
    execution_status: 'initialized',
    output: '[STAGING]: Content verified. Script parsed cleanly but no active runtime intercept routines were declared inside file buffer.'
  });
});

// Global infrastructure operational status monitoring
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    gates: {
      stage1_auth: systemLabState.stage1_cleared,
      stage2_vars: systemLabState.stage2_manipulated,
      active_path: systemLabState.target_destination_path
    }
  });
});

app.listen(PORT, () => {
  console.log(`[SYSTEM RUNNING]: Central Identity Engine running on port ${PORT}`);
});



// =========================================================================
// RECON VULNERABILITY: EXPOSED STAGING DEBUG INTERFACE (INFORMATION DISCLOSURE)
// =========================================================================
app.get('/api/v1/debug/db-status', (req, res) => {
  // Simulating a system information leak that helps the player craft the Stage 1 SQLi
  res.status(200).json({
    environment: "staging_environment_alpha",
    database_engine: "SQLite3_Virtual_Core",
    connection_status: "active",
    schema_blueprint: {
      target_table: "operators",
      monitored_fields: ["id", "username", "password_hash", "role"],
      active_query_template: "SELECT * FROM operators WHERE username = 'INPUT_USER' AND password = 'INPUT_PASSWORD'"
    },
    system_diagnostic_notes: "Notice: Strict parameter sanitization filters are currently toggled OFF for structural testing routines. Use standard connection strings."
  });
});
