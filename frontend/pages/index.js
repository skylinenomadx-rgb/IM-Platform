import { useState, useEffect } from 'react';

export default function IntegratedEnterprisePortal() {
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
          payload: `[SUCCESS] Synchronized state verified. Cluster node [${data.cluster_node}] validated successfully against active directory ledger.`
        });
      } else {
        setAuditResult({
          type: 'failed',
          payload: '[ERROR] Core verification failure: Remote node signature could not be resolved in the platform registry.'
        });
      }
    } catch (err) {
      setAuditResult({
        type: 'failed',
        payload: '[TIMEOUT] Network pipeline error: Core identity load-balancer dropped the asynchronous payload handler.'
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'Inter, system-ui, -apple-system, sans-serif', color: '#1e293b', margin: 0, padding: 0 }}>
      
      {/* Top Professional Compliance Bar */}
      <div style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '12px 40px', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', letterSpacing: '0.05em' }}>
        <div style={{ fontWeight: '600' }}>RESTRICTED STAGING NETWORK // FEDERATED ACCESS LAYER v4.92 // IA-COMPLIANT</div>
        <div>NODE_TIME: <span style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{currentTime || 'SYNCHRONIZING...'}</span></div>
      </div>

      {/* Corporate Header */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#1e40af', color: '#ffffff', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '20px', letterSpacing: '-0.05em' }}>IS</div>
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.03em' }}>IdentitySync Global</span>
          </div>
          <nav style={{ display: 'flex', gap: '32px', alignItems: 'center', fontSize: '14px', fontWeight: '500' }}>
            <a href="#solutions" style={{ color: '#475569', textDecoration: 'none' }}>Platform Solutions</a>
            <a href="#infrastructure" style={{ color: '#475569', textDecoration: 'none' }}>Infrastructure</a>
            <a href="#architecture" style={{ color: '#475569', textDecoration: 'none' }}>Technical Architecture</a>
            <a href="#compliance" style={{ color: '#475569', textDecoration: 'none' }}>Compliance & Profile</a>
            <a href="#console-workspace" style={{ backgroundColor: '#1e40af', color: '#ffffff', padding: '10px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', boxShadow: '0 4px 6px -1px rgba(30, 64, 175, 0.2)' }}>Operator Console</a>
          </nav>
        </div>
      </header>

      {/* SECTION 1: HERO CONTAINER (Realistic image layout + messaging) */}
      <section style={{ position: 'relative', background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)', color: '#ffffff', padding: '120px 40px', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ flex: '1.2', paddingRight: '20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', marginBottom: '28px', border: '1px solid rgba(56, 189, 248, 0.25)', letterSpacing: '0.025em' }}>
              Distributed Enterprise Directory Systems
            </div>
            <h1 style={{ fontSize: '52px', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.04em', margin: '0 0 24px 0' }}>
              Synchronized Identity Management. Built for Critical Assets.
            </h1>
            <p style={{ fontSize: '19px', color: '#94a3b8', lineHeight: '1.6', margin: '0 0 40px 0', fontWeight: '400', maxWidth: '620px' }}>
              Automate multi-tenant domain replication matrices, coordinate remote endpoint lookups, and secure core user identity registers across independent network topologies through verified data pipelines.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#console-workspace" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '14px 28px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)' }}>Initialize Node Audit</a>
              <a href="#architecture" style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '14px 28px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', border: '1px solid #475569' }}>Read Technical Whitepaper</a>
            </div>
          </div>
          
          <div style={{ flex: '0.8', display: 'flex', justifyContent: 'center' }}>
            {/* Real corporate team interaction graphic */}
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" 
              alt="Enterprise Technology Team Consulting on Infrastructure Deployments" 
              style={{ width: '100%', maxWidth: '480px', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: THE DETAILED CORPORATE VALUE PROPOSITION */}
      <section id="solutions" style={{ padding: '100px 40px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core Framework Features</span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#0f172a', margin: '10px 0 0 0', letterSpacing: '-0.025em' }}>High-Assurance Infrastructure Control</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '28px', marginBottom: '20px' }}>🔐</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: '0 0 12px 0' }}>Federated Registry Sync</h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                Maintain full authority over distributed cross-domain mappings. System configurations verify parameters dynamically to reduce replication conflicts across high-traffic environments.
              </p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '28px', marginBottom: '20px' }}>🚀</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: '0 0 12px 0' }}>Sub-Zero Latency Telemetry</h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                Asynchronous validation pathways cross-reference node infrastructure against the back-end registry layer, streaming node health variables without pipeline interruptions.
              </p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '28px', marginBottom: '20px' }}>🗺️</div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: '0 0 12px 0' }}>Partition Domain Mapping</h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                Map underlying target network layouts comprehensively. Track machine records natively inside protected directory tables without compromising perimeter parameters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DEEP PROFESSIONAL DOCUMENTATION SECTION (Adds scrolling weight & realism) */}
      <section id="infrastructure" style={{ padding: '100px 40px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '60px', alignItems: 'center' }}>
          <div style={{ flex: '0.9' }}>
            <img 
              src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80" 
              alt="Data Center Server Mainframe Columns" 
              style={{ width: '100%', borderRadius: '10px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            />
          </div>
          <div style={{ flex: '1.1' }}>
            <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Operations & Integration Blueprint</span>
            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: '8px 0 20px 0', letterSpacing: '-0.02em' }}>Unified Multi-Cluster System Architecture</h2>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '20px' }}>
              The IdentitySync framework establishes a secure, persistent connection back to remote registry databases. By decoupling public request handlers from centralized credential ledgers, corporate operators can verify systemic environment metrics without exposing network perimeter controls.
            </p>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>
              Every server pool configuration, administrative signature token, and routing lookup parameter executed through the gateway undergoes automated validation checks against the underlying application mapping.
            </p>
            <div style={{ borderLeft: '4px solid #1e40af', paddingLeft: '20px', backgroundColor: '#f8fafc', padding: '18px 24px', borderRadius: '0 8px 8px 0' }}>
              <span style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>Deployment Standard Compliance Notice</span>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>This deployment represents a secure operational staging cluster node. To synchronize persistent production pools, ensure network routing parameters pass signature structural constraints.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CORPORATE OVERVIEW (Mission & Vision Statements) */}
      <section id="compliance" style={{ padding: '100px 40px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Corporate Profile & Objectives</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginTop: '8px' }}>Operational standards guiding our network infrastructure engineering practices.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '35px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e40af', margin: '0 0 10px 0' }}>Our Core Mission</h3>
              <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#334155', margin: 0 }}>
                To engineer immutable directory coordination pipelines that prevent configuration drift and identity authentication failure cross-internally. We aim to protect critical cloud architecture assets from structural visibility exceptions by maintaining precise, verifiable replication schemas across distributed data layers.
              </p>
            </div>
            
            <div style={{ backgroundColor: '#ffffff', padding: '35px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e40af', margin: '0 0 10px 0' }}>Operational Vision</h3>
              <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#334155', margin: 0 }}>
                To pioneer fully resilient cross-origin framework engines where target endpoints resolve telemetry lookups smoothly and transparently, assuring security compliance boundaries remain perfectly auditable by DevOps personnel and external systems engineering authorities alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE CONSOLE WORKSPACE (The actual interactive pentest lab core) */}
      <section id="console-workspace" style={{ padding: '100px 40px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Warning notice box to look like a restricted company interface */}
          <div style={{ backgroundColor: '#fffbeb', borderLeft: '4px solid #d97706', padding: '20px 24px', borderRadius: '4px', marginBottom: '35px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <h4 style={{ margin: '0 0 6px 0', color: '#92400e', fontSize: '14px', fontWeight: '700', letterSpacing: '0.025em' }}>⚠️ REGULATORY NOTICE: ADMINISTRATIVE PORTAL</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#b45309', lineHeight: '1.5' }}>
              Access to this terminal workspace is explicitly restricted to authorized engineering personnel. Target input parameters, origin network routing footprints, and dynamic diagnostic execution queries are continuously recorded onto immutable system monitoring streams. Programmatic input manipulation triggers immediate account exclusion.
            </p>
          </div>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '45px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px 0' }}>Node Integrity Assessment Workspace</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '35px' }}>
              Input an active infrastructure node domain signature or host tag below to execute an asynchronous schema consistency verification check against the primary centralized data cluster.
            </p>

            <form onSubmit={handleAuditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155', letterSpacing: '0.025em' }}>Infrastructure Host Signature Query</label>
              <div style={{ display: 'flex', gap: '14px' }}>
                <input 
                  type="text" 
                  placeholder="e.g., node-registry-01.local" 
                  value={targetHost} 
                  onChange={(e) => setTargetHost(e.target.value)} 
                  style={{ flexGrow: 1, padding: '14px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)' }} 
                  required 
                />
                <button type="submit" disabled={isRunning} style={{ padding: '14px 28px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  {isRunning ? 'Executing Telemetry Query...' : 'Verify Registry Data'}
                </button>
              </div>
            </form>

            {/* The raw, monospace programmatic feedback screen that pentesters look at */}
            {auditResult && (
              <div style={{ marginTop: '30px', padding: '20px', borderRadius: '6px', fontSize: '13px', fontFamily: 'SFMono-Regular, Consolas, Monaco, monospace', border: '1px solid', backgroundColor: auditResult.type === 'success' ? '#f0fdf4' : '#fef2f2', borderColor: auditResult.type === 'success' ? '#bbf7d0' : '#fecaca', color: auditResult.type === 'success' ? '#166534' : '#991b1b', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {auditResult.payload}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enterprise Page Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#64748b', padding: '50px 40px', fontSize: '13px', textAlign: 'center', borderTop: '1px solid #1e293b' }}>
        <p style={{ margin: '0 0 12px 0', color: '#94a3b8', fontWeight: '500' }}>&copy; 2026 IdentitySync Global Corporation. All rights reserved.</p>
        <p style={{ margin: 0, fontSize: '11px', color: '#475569', lineHeight: '1.5' }}>
          Security Compliance Blueprint: ISO/IEC 27001 Certified Environment Framework. Private Staging Cluster. <br />
          System connections are processed securely via Vercel Cloud Architecture and decoupled Express Server routing layers.
        </p>
      </footer>

    </div>
  );
}
