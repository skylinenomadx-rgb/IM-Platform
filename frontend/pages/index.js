import { useState, useEffect } from 'react';

export default function IMWelcomePortal() {
  const [targetQuery, setTargetQuery] = useState('');
  const [executionOutput, setExecutionOutput] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('welcome');
  const [systemTime, setSystemTime] = useState('');

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
          text: `Telemetry Verification Complete: Node synchronization successful with cluster domain ${payload.cluster_node}. Metrics logged.`
        });
      } else {
        setExecutionOutput({ type: 'error', text: 'Infrastructure Exception: Central synchronization worker rejected processing scope.' });
      }
    } catch (fault) {
      setExecutionOutput({ type: 'error', text: 'Network Interruption: Gateway could not reach the tracking server instance.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'Segoe UI, Roboto, Helvetica Neue, sans-serif', color: '#1f2937' }}>
      <div style={{ backgroundColor: '#111827', color: '#9ca3af', padding: '10px 40px', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #2563eb' }}>
        <div>INTERNAL ACCESS ONLY // SECURE NODE CLUSTER</div>
        <div>SYS_TIME: <span style={{ color: '#f3f4f6', fontFamily: 'monospace' }}>{systemTime || 'FETCHING...'}</span></div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 16px', borderRadius: '6px', fontWeight: '800', fontSize: '22px', letterSpacing: '1px' }}>IM</div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>Identity Management & Diagnostic Core</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '2px 0 0 0' }}>Enterprise Directory Authorization & Global Infrastructure Telemetry Portal</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid #d1d5db', marginBottom: '25px' }}>
          <button onClick={() => setActiveTab('welcome')} style={{ padding: '12px 24px', border: '1px solid transparent', borderBottom: 'none', borderRadius: '4px 4px 0 0', backgroundColor: activeTab === 'welcome' ? '#ffffff' : 'transparent', fontWeight: activeTab === 'welcome' ? '600' : '400', color: activeTab === 'welcome' ? '#2563eb' : '#4b5563', cursor: 'pointer' }}>
            System Welcome & Notice
          </button>
          <button onClick={() => setActiveTab('console')} style={{ padding: '12px 24px', border: '1px solid transparent', borderBottom: 'none', borderRadius: '4px 4px 0 0', backgroundColor: activeTab === 'console' ? '#ffffff' : 'transparent', fontWeight: activeTab === 'console' ? '600' : '400', color: activeTab === 'console' ? '#2563eb' : '#4b5563', cursor: 'pointer' }}>
            Diagnostic Mapping Console
          </button>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '40px', border: '1px solid #e5e7eb' }}>
          {activeTab === 'welcome' && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginTop: 0, marginBottom: '15px' }}>Welcome to the IM Staging Environment Portal</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#4b5563' }}>
                This diagnostic utility provides systems administrators, network coordinators, and authorized DevOps engineers real-time mapping over central directory registries and node endpoints. Ensure your cluster configurations match target deployment models before requesting production migration windows.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', margin: '30px 0' }}>
                <div style={{ padding: '15px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px' }}>
                  <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600' }}>API Gateway</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#14532d', marginTop: '5px' }}>Operational</div>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px' }}>
                  <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600' }}>Cluster Sync</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#14532d', marginTop: '5px' }}>Active (100%)</div>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px' }}>
                  <div style={{ fontSize: '12px', color: '#1e40af', fontWeight: '600' }}>Environment</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#1e3a8a', marginTop: '5px' }}>Staging Instance</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#fffbeb', borderLeft: '4px solid #d97706', padding: '15px 20px', borderRadius: '0 6px 6px 0', margin: '25px 0' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#92400e', fontSize: '14px', fontWeight: '600' }}>Legal & Security Compliance Warning</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#78350f', lineHeight: '1.5' }}>
                  Unauthorized access to this system or misdirection of structural metrics is strictly prohibited under corporate information policy frameworks. All query tasks, parameters, and initiating network signatures are persistently logged across distributed auditing ledgers.
                </p>
              </div>

              <div style={{ textAlign: 'right', marginTop: '30px' }}>
                <button onClick={() => setActiveTab('console')} style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
                  Enter Operational Console →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'console' && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginTop: 0, marginBottom: '10px' }}>Node Integrity Assessment Tool</h2>
              <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '25px' }}>Input an authoritative network domain cluster signature below to cross-examine target metadata attributes against current database state registries.</p>

              <form onSubmit={triggerTelemetryAudit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}>Target Mapping Host Domain</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="text" placeholder="e.g., node-registry-01.local" value={targetQuery} onChange={(e) => setTargetQuery(e.target.value)} style={{ flexGrow: 1, padding: '12px 14px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }} required />
                  <button type="submit" disabled={isProcessing} style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                    {isProcessing ? 'Syncing Target...' : 'Query Infrastructure'}
                  </button>
                </div>
              </form>

              {executionOutput && (
                <div style={{ marginTop: '24px', padding: '15px', borderRadius: '4px', fontSize: '13px', border: '1px solid', backgroundColor: executionOutput.type === 'success' ? '#f0fdf4' : '#fef2f2', borderColor: executionOutput.type === 'success' ? '#bbf7d0' : '#fecaca', color: executionOutput.type === 'success' ? '#166534' : '#991b1b', fontFamily: 'monospace' }}>
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
