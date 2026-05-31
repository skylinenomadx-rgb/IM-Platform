import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Console() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(null);
  
  const [targetHost, setTargetHost] = useState('');
  const [auditResult, setAuditResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toUTCString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://im-backend-api.onrender.com';
      const response = await fetch(`${apiEndpoint}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.authenticated === true) {
        setIsAuthenticated(true);
        // Store session configuration tokens safely in local environment memory
        localStorage.setItem('_sys_session_token', data.token);
      } else {
        setAuthError(data.message || 'Access Denied: Invalid operator signatures matching system directories.');
      }
    } catch (err) {
      setAuthError('Gateway Error: Core authentication cluster failed to respond to transaction handshake.');
    }
  };

  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    setIsRunning(true);
    setAuditResult(null);

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://im-backend-api.onrender.com';
      const token = localStorage.getItem('_sys_session_token');
      
      const response = await fetch(`${apiEndpoint}/api/v1/telemetry/search`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ query_string: targetHost }),
      });
      const data = await response.json();
      
      if (data.status === 'synchronized') {
        setAuditResult({
          type: 'success',
          payload: `[SUCCESS] Sync verified: Node [${data.cluster_node}] matches upstream database master tables.`
        });
      } else {
        setAuditResult({
          type: 'failed',
          payload: '[ERROR] Verification error: Input host record signature could not be verified.'
        });
      }
    } catch (err) {
      setAuditResult({
        type: 'failed',
        payload: '[TIMEOUT] Route failure: The centralized identity service gateway interface dropped the connection hook.'
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '12px 40px', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
        <div style={{ fontWeight: '600', letterSpacing: '0.05em' }}>RESTRICTED ACCESS PORTAL // CONFIGURATION STAGING NETWORK</div>
        <div className="mono">SYSTEM_TIME: <span style={{ color: '#38bdf8' }}>{currentTime || 'SYNCING...'}</span></div>
      </div>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 40px', minHeight: '75vh' }}>
        
        {/* CONDITION 1: NOT AUTHENTICATED - SHOW SECURE ENTERPRISE LOGIN */}
        {!isAuthenticated ? (
          <div style={{ maxWidth: '450px', margin: '40px auto', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-block', backgroundColor: '#0f172a', color: '#ffffff', padding: '8px 12px', borderRadius: '4px', fontWeight: '800', fontSize: '14px', marginBottom: '12px' }}>INTERNAL USE ONLY</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Federated Identity Console</h3>
              <p style={{ color: '#64748b', fontSize: '13px', marginTop: '6px' }}>Provide operator clearance keys to initial session mappings</p>
            </div>

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Operator ID / Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="e.g., op-admin-04" 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>System Access Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••••••" 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                  required 
                />
              </div>

              {authError && (
                <div className="mono" style={{ padding: '12px', borderRadius: '4px', fontSize: '12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', lineHeight: '1.5' }}>
                  {authError}
                </div>
              )}

              <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' }}>
                Authenticate Operator
              </button>
            </form>
          </div>
        ) : (
          
          /* CONDITION 2: AUTHENTICATED - UNLOCK SUBSEQUENT LAB WORKSPACE */
          <div>
            <div style={{ backgroundColor: '#fffbeb', borderLeft: '4px solid #d97706', padding: '20px 24px', borderRadius: '4px', marginBottom: '40px' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#92400e', fontSize: '14px', fontWeight: '700' }}>⚠️ WARNING: COMPLIANCE MONITORING ACTIVE</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#b45309', lineHeight: '1.5' }}>
                Session mapping active. Every administrative execution query, host signature parameter, and request routing vector is logged permanently to systemic backend tracking streams.
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '45px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>Node Integrity Assessment Workspace</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>
                Input an active infrastructure node registration domain signature below to execute an asynchronous schema validation consistency check.
              </p>

              <form onSubmit={handleAuditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Infrastructure Host Query Signature</label>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <input 
                    type="text" 
                    placeholder="e.g., node-registry-01.local" 
                    value={targetHost} 
                    onChange={(e) => setTargetHost(e.target.value)} 
                    style={{ flexGrow: 1, padding: '14px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                    required 
                  />
                  <button type="submit" disabled={isRunning} style={{ padding: '14px 28px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                    {isRunning ? 'Querying Master Node...' : 'Verify Registry Data'}
                  </button>
                </div>
              </form>

              {auditResult && (
                <div className="mono" style={{ marginTop: '30px', padding: '20px', borderRadius: '6px', fontSize: '13px', border: '1px solid', backgroundColor: auditResult.type === 'success' ? '#f0fdf4' : '#fef2f2', borderColor: auditResult.type === 'success' ? '#bbf7d0' : '#fecaca', color: auditResult.type === 'success' ? '#166534' : '#991b1b', lineHeight: '1.6' }}>
                  {auditResult.payload}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
