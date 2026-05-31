import { useState, useEffect } from 'react';

export default function IMWelcomePortal() {
  const [targetQuery, setTargetQuery] = useState('');
  const [executionOutput, setExecutionOutput] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('welcome');
  const [systemTime, setSystemTime] = useState('');

  // Live clock synchronization for enterprise fidelity
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setSystemTime(now.toUTCString());
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerTelemetryAudit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setExecutionOutput(null);

    try {
      const coreHost = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://im-backend-api.onrender.com';
      const executionTask = await fetch(`${coreHost}/api/v1/telemetry/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query_string: targetQuery }),
      });
      
      const payload = await executionTask.json();
      if (payload.status === 'synchronized') {
        setExecutionOutput({
          type: 'success',
          text: `Telemetry Verification Complete: Node synchronization successful with cluster domain [${payload.cluster_node}]. System state healthy.`
        });
      } else {
        setExecutionOutput({ type: 'error', text: 'Infrastructure Exception: Target host rejected handshake or signature mismatch detected.' });
      }
    } catch (fault) {
      setExecutionOutput({ type: 'error', text: 'Network Interruption: Core gateway could not reach the remote logging instance.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#1f2937' }}>
      
      {/* Top Security Banner */}
      <div style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '12px 40px', fontSize: '11px', letterSpacing: '0.05em', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #2563eb', fontWeight: '600' }}>
        <div>RESTRICTED AREA // AUTHORIZED PERSONNEL ONLY // STAGING ENVIRONMENT</div>
        <div>NODE_TIME: <span style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{systemTime || 'SYNCHRONIZING...'}</span></div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 24px' }}>
        
        {/* Masthead Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '35px' }}>
          <div style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '14px 18px', borderRadius: '8px', fontWeight: '800', fontSize: '24px', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>IM</div>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>Identity Management & Infrastructure Control</h1>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '4px 0 0 0' }}>Internal Directory Registry & Distributed Diagnostics Node Cluster</p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid #cbd5e1', marginBottom: '30px' }}>
          <button 
            onClick={() => setActiveTab('welcome')} 
            style={{ padding: '14px 28px', border: '1px solid transparent', borderBottom: 'none', borderRadius: '6px 6px 0 0', backgroundColor: activeTab === 'welcome' ? '#ffffff' : 'transparent', fontWeight: activeTab === 'welcome' ? '600' : '500', color: activeTab === 'welcome' ? '#2563eb' : '#64748b', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s', borderColors: activeTab === 'welcome' ? '#cbd5e1 #cbd5e1 transparent' : 'transparent' }}
          >
            System Overview & Directives
          </button>
          <button 
            onClick={() => setActiveTab('console')} 
            style={{ padding: '14px 28px', border: '1px solid transparent', borderBottom: 'none', borderRadius: '6px 6px 0 0', backgroundColor: activeTab === 'console' ? '#ffffff' : 'transparent', fontWeight: activeTab === 'console' ? '600' : '500', color: activeTab === 'console' ? '#2563eb' : '#64748b', cursor: 'pointer', fontSize: '14px', transition: 'all 0.2s', borderColors: activeTab === 'console' ? '#cbd5e1 #cbd5e1 transparent' : 'transparent' }}
          >
            Diagnostic Telemetry Console
          </button>
        </div>

        {/* Dynamic Display Panel */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03), 0 1px 3px rgba(15, 23, 42, 0.02)', padding: '45px', border: '1px solid #e2e8f0' }}>
          
          {/* VIEW A: WELCOME DIRECTIVE */}
          {activeTab === 'welcome' && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '600', color: '#0f172a', marginTop: 0, marginBottom: '16px' }}>Staging Environment Gateway</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#475569', margin: 0 }}>
                Welcome to the unified administrative interface for internal identity management routines and cross-domain asset indexing. This environment lets DevOps operators and engineering leadership run automated data consistency handshakes, audit tracking flags, and record health mapping across active deployment fields.
              </p>

              {/* Server Telemetry Metrics Blocks */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', margin: '35px 0' }}>
                <div style={{ padding: '16px 20px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700', letterSpacing: '0.05em' }}>CENTRAL API LINK</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#14532d', marginTop: '6px' }}>Online & Routed</div>
                </div>
                <div style={{ padding: '16px 20px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700', letterSpacing: '0.05em' }}>REGISTRY REPLICATION</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#14532d', marginTop: '6px' }}>Synchronized (100%)</div>
                </div>
                <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700', letterSpacing: '0.05em' }}>ENVIRONMENT CLASS</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginTop: '6px' }}>Internal Staging</div>
                </div>
              </div>

              {/* Regulatory Notice Banner */}
              <div style={{ backgroundColor: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '18px 24px', borderRadius: '0 6px 6px 0', margin: '30px 0' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#b45309', fontSize: '14px', fontWeight: '700' }}>Administrative Access Warning & Compliance Policy</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#78350f', lineHeight: '1.5' }}>
                  All actions taken inside this operational instance are governed by federal and organizational privacy boundaries. Query parameters, execution tracking tags, and originating networking headers are actively recorded to immutable administrative ledgers. Misuse will result in immediate termination of cluster privileges.
                </p>
              </div>

              {/* Console Navigation Trigger */}
              <div style={{ textAlign: 'right', marginTop: '35px' }}>
                <button 
                  onClick={() => setActiveTab('console')} 
                  style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '14px 32px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 10px rgba(37,99,235,0.15)', transition: 'background-color 0.2s' }}
                >
                  Launch Operational Console →
                </button>
              </div>
            </div>
          )}

          {/* VIEW B: FUNCTIONAL DIAGNOSTIC CONSOLE */}
          {activeTab === 'console' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#0f172a', marginTop: 0, marginBottom: '8px' }}>Node Integrity Assessment Workspace</h2>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>Input an internal network machine host signature or cluster domain below to resolve current registration details against the target database cluster context.</p>

              <form onSubmit={triggerTelemetryAudit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Target Mapping Host Signature</label>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <input 
                    type="text" 
                    placeholder="e.g., identity-cluster-01.local" 
                    value={targetQuery} 
                    onChange={(e) => setTargetQuery(e.target.value)} 
                    style={{ flexGrow: 1, padding: '14px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s' }} 
                    required 
                  />
                  <button 
                    type="submit" 
                    disabled={isProcessing} 
                    style={{ padding: '14px 28px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    {isProcessing ? 'Running Telemetry Scan...' : 'Verify Metrics'}
                  </button>
                </div>
              </form>

              {executionOutput && (
                <div style={{ marginTop: '30px', padding: '18px', borderRadius: '6px', fontSize: '13px', border: '1px solid', backgroundColor: executionOutput.type === 'success' ? '#f0fdf4' : '#fef2f2', borderColor: executionOutput.type === 'success' ? '#bbf7d0' : '#fecaca', color: executionOutput.type === 'success' ? '#166534' : '#991b1b', fontFamily: 'SFMono-Regular, Consolas, Monaco, monospace', lineHeight: '1.5' }}>
                  {executionOutput.text}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
