import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Console() {
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

  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    setIsRunning(true);
    setAuditResult(null);

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://im-backend-api.onrender.com';
      const response = await fetch(`${apiEndpoint}/api/v1/telemetry/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query_string: targetHost }),
      });
      const data = await response.json();
      
      if (data.status === 'synchronized') {
        setAuditResult({
          type: 'success',
          payload: `[SUCCESS] Verification successful. Node [${data.cluster_node}] aligned completely with backend ledger coordinates.`
        });
      } else {
        setAuditResult({
          type: 'failed',
          payload: '[ERROR] Verification error: Input host record signature could not be verified in registry tables.'
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
        <div style={{ backgroundColor: '#fffbeb', borderLeft: '4px solid #d97706', padding: '20px 24px', borderRadius: '4px', marginBottom: '40px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
          <h4 style={{ margin: '0 0 6px 0', color: '#92400e', fontSize: '14px', fontWeight: '700' }}>⚠️ WARNING: COMPLIANCE MONITORING ACTIVE</h4>
          <p style={{ margin: 0, fontSize: '13px', color: '#b45309', lineHeight: '1.5' }}>
            This workspace acts directly against raw database validation pools. Every query input, target string constraint, and request footprint is logged to immutable auditing streams. Input strings passing unexpected characters or structural breakouts are flagged for structural compliance failure.
          </p>
        </div>

        <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '45px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>Node Integrity Assessment Workspace</h3>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px', lineHeight: '1.5' }}>
            Input an active infrastructure node registration domain signature below to execute an asynchronous schema validation consistency check against the primary centralized ledger system.
          </p>

          <form onSubmit={handleAuditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', letterSpacing: '0.025em' }}>Infrastructure Host Query Signature</label>
            <div style={{ display: 'flex', gap: '14px' }}>
              <input 
                type="text" 
                placeholder="e.g., node-registry-01.local" 
                value={targetHost} 
                onChange={(e) => setTargetHost(e.target.value)} 
                style={{ flexGrow: 1, padding: '14px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} 
                required 
              />
              <button type="submit" disabled={isRunning} style={{ padding: '14px 28px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                {isRunning ? 'Querying Master Node...' : 'Verify Registry Data'}
              </button>
            </div>
          </form>

          {auditResult && (
            <div className="mono" style={{ marginTop: '30px', padding: '20px', borderRadius: '6px', fontSize: '13px', border: '1px solid', backgroundColor: auditResult.type === 'success' ? '#f0fdf4' : '#fef2f2', borderColor: auditResult.type === 'success' ? '#bbf7d0' : '#fecaca', color: auditResult.type === 'success' ? '#166534' : '#991b1b', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
              {auditResult.payload}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
