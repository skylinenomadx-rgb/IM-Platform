# Create the complete, unified server.js file for the MATRIX-SYNC Global Supply-Chain Ledger Lab.
# This file embeds the complex vulnerabilities described, fully functional, with no omissions.

server_code = """const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Global state tracking engine mimicking an enterprise logistics memory cluster
let appState = {
    activeSessionToken: null,
    storageDestinationPath: '/var/log/matrix_sync/telemetry/',
    synchronizedNodes: new Set(['node-registry-01.local', 'fleet-tally-04.local']),
    operatorTier: 'operator',
    uploadedFiles: {}
};

app.use(cors({
    origin: '*',
    exposedHeaders: ['X-Matrix-Debug-Ref']
}));
app.use(express.json());

// STAGE 1: Verbose Information Leakage via Custom HTTP Response Header
app.use((req, res, next) => {
    res.setHeader('X-Matrix-Debug-Ref', 'STAGING_ROUTING_INDEX_STATUS: /api/v1/debug/node-status');
    next();
});

// STAGE 2: SQL Injection (SQLi) via JSON Payload
// Fakes a raw SQL backend evaluation loop for user authentication clearance
app.post('/api/v1/auth/login', (req, requireRes) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return requireRes.status(400).json({ authenticated: false, message: 'Missing parameters.' });
    }

    // Vulnerable raw query evaluation emulation logic
    // Allows standard SQL injection payloads such as: ' OR '1'='1
    const isSqlInjection = username.includes("'") || password.includes("'");
    const isBypass = username.includes("' OR '1'='1") || password.includes("' OR '1'='1");

    if (isBypass || (username === 'sys-admin-node' && password === 'ClusterSecurePassword2026')) {
        // STAGE 3: Weak Cryptographic Token Generation
        // Generates token using predictable base64 parameters rather than a cryptographically secure signature
        const pseudoTimestamp = Math.floor(Date.now() / 10000); // 10-second predictable windows
        const generatedToken = Buffer.from(`operator_id=1004;tier=operator;time=${pseudoTimestamp}`).toString('base64');
        
        appState.activeSessionToken = generatedToken;
        appState.operatorTier = 'operator'; // Initial mapping forces standard operator tier

        return requireRes.status(200).json({
            authenticated: true,
            token: generatedToken,
            redirect_path: '/internal_operations?tier=operator',
            message: 'Authentication successful. Operator session mapped.'
        });
    }

    return requireRes.status(401).json({
        authenticated: false,
        message: 'Authentication failed. Invalid clearance signature matching.'
    });
});

// STAGE 1 Debug Target End-Point leaked in the custom header
app.get('/api/v1/debug/node-status', (req, res) => {
    res.status(200).json({
        service_status: 'online',
        database_cluster: 'synchronized',
        raw_query_template: "SELECT * FROM core_operators WHERE user_id = '" + (req.query.id || 'guest') + "' AND pass_hash = 'INPUT_PARAM'",
        diagnostic_note: 'Perimeter gates run automated query validation loops.'
    });
});

// Session validation token check middleware function
const validateSessionHook = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Forbidden. Access token parameter absent.' });
    }

    const extractionToken = authHeader.split(' ')[1];
    if (!appState.activeSessionToken || extractionToken !== appState.activeSessionToken) {
        return res.status(401).json({ message: 'Unauthorized. Invalid security session signature token.' });
    }

    // Extract tier parameter dynamically from token string base64 payload to pass operational contexts
    try {
        const decodedString = Buffer.from(extractionToken, 'base64').toString('ascii');
        if (decodedString.includes('tier=super-admin')) {
            appState.operatorTier = 'super-admin';
        }
    } catch(err) {
        // Fallback default catch block
    }

    next();
};

// STAGE 4: Broken Object-Level Authorization (BOLA/IDOR) & STAGE 5: HTTP Parameter Pollution (HPP)
app.post('/api/v1/config/routing', validateSessionHook, (req, res) => {
    // Check URL parameters directly for tier status override rather than validating authorization matrices via token context
    const urlTierContext = req.query.tier;
    
    if (urlTierContext !== 'super-admin' && appState.operatorTier !== 'super-admin') {
        return res.status(403).json({ message: 'Operation rejected. Action requires escalation authorization to [super-admin] clearance.' });
    }

    const { config_target, value } = req.body;

    if (!config_target || !value) {
        return res.status(400).json({ message: 'Missing routing parameters.' });
    }

    // STAGE 5: Parameter Pollution checking mechanics
    // Inspects if multiple values are bundled inside an application array input parameter to override directory configurations
    if (Array.isArray(value)) {
        appState.storageDestinationPath = value[value.length - 1];
    } else {
        appState.storageDestinationPath = value;
    }

    return res.status(200).json({
        message: 'Storage destination route vector committed successfully into the active configuration arrays.',
        current_path: appState.storageDestinationPath
    });
});

// STAGE 6: State Machine Synchronization Bypass & STAGE 7: Unrestricted File Upload via Extension Spoofing
app.post('/api/v1/telemetry/upload', validateSessionHook, (req, res) => {
    const { filename, file_content } = req.body;

    if (!filename || !file_content) {
        return res.status(400).json({ message: 'Upload array values absent.' });
    }

    // STAGE 7: File Extension validation filter with bypass vectors
    // Weak extension detection verification block: searches if target ends with standard extension formats
    // Bypassed using complex extension layouts or trailing parameter mutations like 'payload.js.txt' or hidden characters
    if (filename.toLowerCase().endsWith('.js') && !filename.includes('.js.')) {
        return res.status(400).json({ message: 'Deployment filter violation: Direct execution script uploads (.js) are strictly banned for standard operators.' });
    }

    // Save the configuration file directly into volatile application memory space matching specified structural target parameters
    const mappedPath = path.join(appState.storageDestinationPath, filename);
    appState.uploadedFiles[mappedPath] = file_content;

    return res.status(200).json({
        message: 'Synchronization patch package written to allocation space.',
        saved_at: mappedPath
    });
});

// STAGE 8: Arbitrary File Execution / Path Traversal Trigger Hook
app.post('/api/v1/telemetry/execute', validateSessionHook, (req, res) => {
    const { execution_path } = req.body;

    if (!execution_path) {
        return res.status(400).json({ message: 'Execution path configuration omitted.' });
    }

    // Checks memory store records directly for the mapped target file path
    if (appState.uploadedFiles[execution_path] !== undefined) {
        const payloadString = appState.uploadedFiles[execution_path];

        // Checks if file content contains simulated evaluation conditions to reward flag parameters
        if (payloadString.includes('process.env.FLAG') || payloadString.includes('getFlag')) {
            return res.status(200).json({
                execution_status: 'success',
                output: `[PROCESS EXECUTION SUCCESS]\\n[STDOUT] Executing diagnostic script payload array...\\n[STDOUT] FLAG_CAPTURED: MATRIX{N0N_L1N34R_SUPPLY_CH41N_LOG1C_FL4W}`
            });
        }

        return res.status(200).json({
            execution_status: 'success',
            output: `[PROCESS EXECUTION SUCCESS]\\n[STDOUT] Target code block executed.\\n[STDOUT] Return buffer vector: 0`
        });
    }

    return res.status(404).json({
        message: `Execution target failure: The specified routing path [${execution_path}] does not contain an active, synchronized configuration package file.`
    });
});

// Telemetry node status query lookup route
app.post('/api/v1/telemetry/search', validateSessionHook, (req, res) => {
    const { query_string } = req.body;
    if (appState.synchronizedNodes.has(query_string)) {
        return res.status(200).json({ status: 'synchronized', cluster_node: query_string });
    }
    return res.status(404).json({ status: 'unverified', message: 'Target node reference unmapped.' });
});

app.listen(PORT, () => {
    console.log(`MATRIX-SYNC Enterprise Server core engine running on configuration port ${PORT}`);
});
"""

with open('server.js', 'w') as f:
    f.write(server_code)

print("SUCCESS: server.js file created.")
