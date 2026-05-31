import { useState, useEffect } from 'react';

export default function CorporatePortal() {
  const [activeView, setActiveView] = useState('home');
  const [targetHost, setTargetHost] = useState('');
  const [auditResult, setAuditResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
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
          payload: `[SUCCESS] Secure tunnel verified. Cluster node [${data.cluster_node}] responded with validation parameters.`
        });
      } else {
        setAuditResult({
          type: 'failed',
          payload: '[ERROR] Cryptographic handshake failed. Node signature mismatch or domain unrecognized.'
        });
      }
    } catch (err) {
      setAuditResult({
        type: 'failed',
        payload: '[TIMEOUT] Route connection failure: The master load balancer dropped the connection.'
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', margin: 0, padding: 0 }}>
      
      {/* Top Professional Utility Bar */}
      <div style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '10px 40px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
        <div style={{ fontWeight: '500', letterSpacing: '0.025em' }}>GLOBAL ACCESS GATEWAY // STAGING LAYER</div>
        <div>SYSTEM CLOCK: <span style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{currentTime || 'SYNCING...'}</span></div>
      </div>

      {/* Main Enterprise Navigation Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', sticky: 'top', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setActiveView('home')}>
            <div style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '10px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '18px' }}>IM</div>
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.025em' }}>IdentitySync Global</span>
          </div>
          
          <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <button onClick={() => setActiveView('home')} style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: activeView === 'home' ? '600' : '500', color: activeView === 'home' ? '#2563eb' : '#64748b', cursor: 'pointer' }}>Home</button>
            <button onClick={() => setActiveView('services')} style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: activeView === 'services' ? '600' : '500', color: activeView === 'services' ? '#2563eb' : '#64748b', cursor: 'pointer' }}>Services</button>
            <button onClick={() => setActiveView('about')} style={{ background: 'none', border: 'none', fontSize: '15px', fontWeight: activeView === 'about' ? '600' : '500', color: activeView === 'about' ? '#2563eb' : '#64748b', cursor: 'pointer' }}>About Us</button>
            <button onClick={() => setActiveView('console')} style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>Operator Login</button>
          </nav>
        </div>
      </header>

      {/* DYNAMIC MAIN CONTENT PANEL */}
      <main>
        
        {/* VIEW 1: PREMIUM CORPORATE HOME / HERO */}
        {activeView === 'home' && (
          <div>
            {/* Split Hero Section */}
            <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', color: '#ffffff', padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '60px', alignItems: 'center' }}>
                <div style={{ flex: '1' }}>
                  <div style={{ display: 'inline-block', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '24px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>Next-Gen Enterprise Architecture</div>
                  <h1 style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.15', letterSpacing: '-0.03em', margin: '0 0 20px 0' }}>Modern Identity Management. Optimized Globally.</h1>
                  <p style={{ fontSize: '18px', color: '#94a3b8', lineHeight: '1.6', margin: '0 0 35px 0' }}>Secure directory infrastructure synchronization, automated replication tracking, and centralized visibility modules designed for critical infrastructure networks.</p>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => setActiveView('services')} style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>Explore Solutions</button>
                    <button onClick={() => setActiveView('about')} style={{ backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #475569', padding: '14px 28px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>Read Our Blueprint</button>
                  </div>
                </div>
                {/* Visual Placeholder representing the Mock UI Dashboard Illustration from the image */}
                <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '30px', width: '100%', maxWidth: '500px', backdropFilter: 'blur(8px)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                    </div>
                    <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed rgba(255, 255, 255, 0.1)', borderRadius: '8px', color: '#64748b' }}>
                      <span style={{ fontSize: '32px', marginBottom: '10px' }}>📊</span>
                      <span style={{ fontSize: '14px', fontWeight: '500' }}>Active Node Cluster Map Visualizer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Features Matrix */}
            <div style={{ padding: '80px 40px', maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ textTransform: 'uppercase', color: '#2563eb', fontWeight: '700', fontSize: '13px', tracking: '0.1em', marginBottom: '10px', textAlign: 'center' }}>Platform Framework</div>
              <h2 style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center', margin: '0 0 50px 0', color: '#0f172a' }}>Engineered for Scalability and Integrity</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' }}>
                <div style={{ border: '1px solid #e2e8f0', padding: '30px', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontSize: '24px', marginBottom: '15px' }}>🔒</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 10px 0' }}>Zero-Knowledge Sync</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>Cryptographically sign transactions across node domains without exposing underlying registration matrices.</p>
                </div>
                <div style={{ border: '1px solid #e2e8f0', padding: '30px', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontSize: '24px', marginBottom: '15px' }}>⚡</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 10px 0' }}>Sub-Millisecond Telemetry</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>Real-time health reporting and error resolution routines cross-communicating with persistent backend layers.</p>
                </div>
                <div style={{ border: '1px solid #e2e8f0', padding: '30px', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                  <div style={{ fontSize: '24px', marginBottom: '15px' }}>🏢</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 10px 0' }}>Federated Registry</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>Distribute access credentials securely across independent structural segments with zero split-brain failure conditions.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PROFESSIONAL SERVICES SUMMARY */}
        {activeView === 'services' && (
          <div style={{ padding: '80px 40px', maxWidth: '1280px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Professional Architecture Services</h2>
            <p style={{ color: '#475569', fontSize: '16px', maxWidth: '700px', marginBottom: '50px', lineHeight: '1.6' }}>We provide high-assurance deployment frameworks and directory alignment support for strict operational environments.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', marginBottom: '10px' }}>1. Cross-Domain Replication Engineering</h3>
                <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6' }}>We map network partitions and write robust synchronization pipelines to ensure database schemas remain uniform across critical assets.</p>
              </div>
              <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '30px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', marginBottom: '10px' }}>2. High-Availability Staging Assessments</h3>
                <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6' }}>Isolate tracking discrepancies within development frameworks before propagating infrastructure layers out to production nodes.</p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: CORPORATE MISSION & VISION (ABOUT US) */}
        {activeView === 'about' && (
          <div style={{ padding: '80px 40px', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#0f172a', marginBottom: '30px' }}>Corporate Profile</h2>
            
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2563eb', marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#334155' }}>To build immutable, transparent directory verification pipelines that eliminate tracking confusion across multi-tenant corporate platforms. We ensure network components can communicate authoritatively under strict cryptographic certainty.</p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2563eb', marginBottom: '12px' }}>Our Vision</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#334155' }}>A completely integrated web ecosystem where backend data manipulation is caught before deployment, protecting directory infrastructure from administrative faults, environmental drifts, and perimeter validation exceptions.</p>
            </div>
          </div>
        )}

        {/* VIEW 4: THE OPERATIONAL CONSOLE (FUNCTIONAL WORKSPACE) */}
        {activeView === 'console' && (
          <div style={{ padding: '60px 40px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#fffbeb', borderLeft: '4px solid #d97706', padding: '16px 20px', borderRadius: '4px', marginBottom: '30px' }}>
              <h4 style={{ margin: '0 0 4px 0', color: '#92400e', fontSize: '14px', fontWeight: '700' }}>RESTRICTED OPERATOR INTERFACE</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#b45309' }}>Unauthorized interaction or programmatic parameter fuzzing against this entry layer violates compliance frameworks. Access parameters are logged natively to database nodes.</p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>Node Integrity Assessment Workspace</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>Provide a synchronized machine host query to map active variables against the distributed ledger database.</p>

              <form onSubmit={handleAuditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Node Domain / Infrastructure Signature</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input 
                    type="text" 
                    placeholder="identity-cluster-01.local" 
                    value={targetHost} 
                    onChange={(e) => setTargetHost(e.target.value)} 
                    style={{ flexGrow: 1, padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
                    required 
                  />
                  <button type="submit" disabled={isRunning} style={{ padding: '12px 24px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                    {isRunning ? 'Analyzing Node Matrix...' : 'Run Diagnostics'}
                  </button>
                </div>
              </form>

              {auditResult && (
                <div style={{ marginTop: '24px', padding: '16px', borderRadius: '6px', fontSize: '13px', fontFamily: 'monospace', border: '1px solid', backgroundColor: auditResult.type === 'success' ? '#f0fdf4' : '#fef2f2', borderColor: auditResult.type === 'success' ? '#bbf7d0' : '#fecaca', color: auditResult.type === 'success' ? '#166534' : '#991b1b', lineHeight: '1.5' }}>
                  {auditResult.payload}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Corporate Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#64748b', padding: '40px', fontSize: '13px', textAlign: 'center', borderTop: '1px solid #1e293b', marginTop: '100px' }}>
        <p style={{ margin: '0 0 10px 0' }}>&copy; 2026 IdentitySync Global Corporation. All rights reserved.</p>
        <p style={{ margin: 0, fontSize: '11px', color: '#475569' }}>Internal Staging Environment Node Deployment // Powered by Vercel Cloud Serverless Functions.</p>
      </footer>

    </div>
  );
}
