import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function InternalOperations() {
  const [sessionToken, setSessionToken] = useState('');
  const [isValidSession, setIsValidSession] = useState(false);
  const [destinationPath, setDestinationPath] = useState('/var/log/identity_sync/telemetry/');
  const [paramInput, setParamInput] = useState('');
  const [updateMessage, setUpdateMessage] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(new Date().toUTCString());
    const token = localStorage.getItem('_sys_session_token');
    if (token) {
      setSessionToken(token);
      setIsValidSession(true);
    }
  }, []);

  const handleParamUpdate = async (e) => {
    e.preventDefault();
    setUpdateMessage(null);

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://im-backend-api.onrender.com';
      
      // Simulating standard parameter configuration updates
      const response = await fetch(`${apiEndpoint}/api/v1/config/routing`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ 
          config_target: 'storage_path', 
          value: paramInput 
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setDestinationPath(data.current_path);
        setUpdateMessage({ type: 'success', text: `[SUCCESS] ${data.message}` });
      } else {
        setUpdateMessage({ type: 'error', text: `[ERROR] ${data.message || 'Configuration modification rejected.'}` });
      }
    } catch (err) {
      setUpdateMessage({ type: 'error', text: '[FAILURE] Communication error updating master configuration parameters.' });
    }
  };

  // HARD GATE CHECK: If no session token exists from Stage 1, display standard permission error
  if (!isValidSession) {
    return (
      <div>
        <Navbar />
        <main style={{ maxWidth: '600px', margin: '100px auto', padding: '40px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', textAlign: 'center' }}>
          <h2 style={{ color: '#991b1b', margin: '0 0 12px 0' }}>403 - Unauthorized Access Perimeter</h2>
          <p style={{ color: '#7f1d1d', fontSize: '15px', lineHeight: '1.6' }}>
            Your connection footprint lacks the cryptographic verification keys required to access internal administrative microservices. Please authenticate through the primary Operator Portal first.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div style={{ backgroundColor: '#1e293b', color: '#94a3b8', padding: '12px 40px', fontSize: '11px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#38bdf8', fontWeight: '700' }}>INTERNAL AREA // CLUSTER OPERATION NODE ALPHA</div>
        <div className="mono">NODE_TIME: <span>{currentTime}</span></div>
      </div>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 40px', minHeight: '75vh' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Internal Directory & Routing Configuration</h2>
        <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '40px' }}>Modify global tracking parameters and target delivery vectors for system storage buckets below.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px' }}>
          
          {/* Parameter Pollution Field Panel */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '35px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', color: '#0f172a' }}>Active Storage Path Parameters</h3>
            
            <div style={{ marginBottom: '24px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', display: 'block', textTransform: 'uppercase' }}>Current Target Directory</span>
              <code className="mono" style={{ fontSize: '14px', color: '#0f172a', fontWeight: '600', display: 'block', marginTop: '4px' }}>{destinationPath}</code>
            </div>

            <form onSubmit={handleParamUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Modify Storage Variable Vector</label>
                <input 
                  type="text" 
                  value={paramInput} 
                  onChange={(e) => setParamInput(e.target.value)}
                  placeholder="e.g., /var/log/custom_path/" 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  required 
                />
              </div>

              {updateMessage && (
                <div className="mono" style={{ padding: '12px', borderRadius: '4px', fontSize: '13px', border: '1px solid', backgroundColor: updateMessage.type === 'success' ? '#f0fdf4' : '#fef2f2', borderColor: updateMessage.type === 'success' ? '#bbf7d0' : '#fecaca', color: updateMessage.type === 'success' ? '#166534' : '#991b1b' }}>
                  {updateMessage.text}
                </div>
              )}

              <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', alignSelf: 'flex-start' }}>
                Commit System Variables
              </button>
            </form>
          </div>

          {/* Locked Upload Sync Section */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '35px', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: '#0f172a' }}>Synchronize Module Packages</h3>
            <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5', marginBottom: '24px' }}>Upload system script arrays to execute cross-domain replication updates.</p>
            
            <div style={{ backgroundColor: '#f1f5f9', border: '2px dashed #cbd5e1', padding: '40px 20px', borderRadius: '6px', textAlign: 'center' }}>
              <div style={{ color: '#475569', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>Package Sync Node Interface</div>
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Accepts signed update bundles or verification packages.</span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
