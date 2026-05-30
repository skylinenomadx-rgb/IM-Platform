const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Fallback secret key for development token validation
const SYSTEM_JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_node_key_5521';

// Initialize connection pool to Supabase cluster
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({ status: 'online', system: 'Identity Management Platform API Gateway' });
});

// Search Route for Telemetry Mapping Node
app.post('/api/v1/telemetry/search', async (req, res) => {
  const { query_string } = req.body;
  
  try {
    // Basic structured search across platform registry infrastructure
    const queryText = 'SELECT * FROM platform_registry WHERE node_domain = $1';
    const result = await pool.query(queryText, [query_string]);
    
    if (result.rows.length > 0) {
      res.json({ status: 'synchronized', cluster_node: result.rows[0].node_domain });
    } else {
      res.json({ status: 'not_found', message: 'No synchronized infrastructure configuration found.' });
    }
  } catch (err) {
    console.error('Database Operation Failure:', err.message);
    res.status(500).json({ status: 'error', error: 'Internal pipeline synchronization exception.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[IM Platform API Online on port ${PORT}]`);
});
