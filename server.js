const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Simulated Internal Database Memory State
const mockUserDatabase = [
  { id: 1, username: 'op-admin-04', password_hash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', role: 'cluster_master' },
  { id: 2, username: 'guest-operator', password_hash: 'a7c5a6104234567efab139415bccee5dfb1234a9c873fc4bb8a81f6f2ab448f432', role: 'viewer' }
];

// Active Server Session Store to maintain progressive gate states
const activeAdminSessions = new Set();

// Track overall lab progress states to prevent bypassing intermediate steps
const systemLabState = {
  stage1_cleared: false,
  stage2_param_polluted: false,
  stage3_file_uploaded: false,
  target_destination_path: '/var/log/identity_sync/telemetry/'
};

// ==========================================
// STAGE 1 ENDPOINT: VULNERABLE LOGIN PROCESSOR
// ==========================================
app.post('/api/v1/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ authenticated: false, message: 'Missing operator credential arrays.' });
  }

  // SYSTEM FLAW: Simulating a vulnerable string concatenation query structure instead of parameterized preparation
  // Real-world SQL Injection targets look for raw input interpretation like this:
  const targetQuery = `SELECT * FROM operators WHERE username = '${username}' AND password = '${password}'`;

  console.log(`[DB QUERY EXECUTED]: ${targetQuery}`);

  // Evaluating the SQL injection condition simulation
  // If the user inputs a syntax breakout like: admin' -- or '1'='1
  const isSqlInjectionBypass = username.includes("'") || username.includes("--");
  
  if (isSqlInjectionBypass) {
    // Generate an authentic administrative session token
    const token = crypto.randomBytes(32).toString('hex');
    activeAdminSessions.add(token);
    systemLabState.stage1_cleared = true;

    return res.status(200).json({
      authenticated: true,
      message: 'Authentication override successful via administrative bypass protocol.',
      token: token,
      redirect_path: '/internal/admin_operations'
    });
  }

  // Standard authentication routine fallback (Will fail unless explicit hash matches)
  const matchedUser = mockUserDatabase.find(user => user.username === username);
  if (matchedUser) {
    const inputHash = crypto.createHash('sha256').update(password).digest('hex');
    if (inputHash === matchedUser.password_hash) {
      const token = crypto.randomBytes(32).toString('hex');
      activeAdminSessions.add(token);
      systemLabState.stage1_cleared = true;

      return res.status(200).json({
        authenticated: true,
        token: token,
        redirect_path: '/internal/admin_operations'
      });
    }
  }

  return res.status(401).json({
    authenticated: false,
    message: 'Access Denied: Invalid operator signatures matching system directories.'
  });
});

// A quick status check endpoint for monitoring the current server state
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'online', stage1: systemLabState.stage1_cleared });
});

app.listen(PORT, () => {
  console.log(`[SYSTEM ONLINE] Centralized Identity Engine executing on port ${PORT}`);
});
