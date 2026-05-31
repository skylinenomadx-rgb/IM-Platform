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

  // File Upload State Variables
  const [uploadFilename, setUploadFilename] = useState('');
  const [uploadContent, setUploadContent] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null);

  // Execution State Variables
  const [execPathInput, setExecPathInput] = useState('');
  const [execStatus, setExecStatus] = useState(null);

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
      const response = await fetch(`${apiEndpoint}/api/v1/config/routing`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ config_target: 'storage_path', value: paramInput }),
      });
      const data = await response.json();

      if (response.ok) {
        setDestinationPath(data.current_path);
        setUpdateMessage({ type: 'success', text: `[SUCCESS] ${data.message}` });
      } else {
        setUpdateMessage({ type: 'error', text: `[ERROR] ${data.message || 'Modification rejected.'}` });
      }
    } catch (err) {
      setUpdateMessage({ type: 'error', text: '[FAILURE] Communication error with routing endpoint.' });
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setUploadStatus(null);

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://im-backend-api.onrender.com';
      const response = await fetch(`${apiEndpoint}/api/v1/telemetry/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ filename: uploadFilename, file_content: uploadContent })
      });
      const data = await response.json();

      if (response.ok) {
        setUploadStatus({ type: 'success', text: `[SUCCESS] ${data.message} Saved Location: ${data.saved_at}` });
      } else {
        setUploadStatus({ type: 'error', text: `[DEPLOYMENT FAILURE] ${data.message || 'Server rejected file stream.'}` });
      }
    } catch (err) {
      setUploadStatus({ type: 'error', text: '[FAILURE] Upload gateway dropped transaction connection hook.' });
    }
  };

  const handleExecutionTrigger = async (e) => {
    e.preventDefault();
    setExecStatus(null);

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://im-backend-api.onrender.com';
      const response = await fetch(`${apiEndpoint}/api/v1/telemetry/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ execution_path: execPathInput })
      });
      const data = await response.json();

      if (response.ok) {
        setExecStatus({ type: data.execution_status === 'success' ? 'success' : 'error', text: data.output });
      } else {
        setExecStatus({ type: 'error', text: `[EXECUTION FAILURE] ${data.message}` });
      }
    } catch (err) {
      setExecStatus({ type: 'error', text: '[FAILURE] Target trigger engine returned connection failure.' });
    }
  };

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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Left Column: Parameter Pollution Form */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '35px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '24px', color: '#0f172a' }}>Stage 2: Active Storage Path Parameters</h3>
            
            <div style={{ marginBottom: '24px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', display: 'block', textTransform: 'uppercase' }}>Current Target Directory</span>
              <code className="mono" style={{ fontSize: '14px', color: '#0f172a', fontWeight: '600', display: 'block', marginTop: '4px' }}>{destinationPath}</code>
            </div>

            <form onSubmit={handleParamUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
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

            {/* Stage 4: Execution Trigger Element */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: '#0f172a' }}>Stage 4: Engine Trigger Subsystem</h3>
              <form onSubmit={handleExecutionTrigger} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Target Namespace Execution Path</label>
                  <input 
                    type="text" 
                    value={execPathInput}
                    onChange={(e) => setExecPathInput(e.target.value)}
                    placeholder="e.g., /var/log/identity_sync/telemetry/patch.js" 
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                    required 
                  />
                </div>

                {execStatus && (
                  <div className="mono" style={{ padding: '12px', borderRadius: '4px', fontSize: '13px', border: '1px solid', backgroundColor: execStatus.type === 'success' ? '#f0fdf4' : '#fef2f2', borderColor: execStatus.type === 'success' ? '#bbf7d0' : '#fecaca', color: execStatus.type === 'success' ? '#166534' : '#991b1b', whiteSpace: 'pre-wrap' }}>
                    {execStatus.text}
                  </div>
                )}

                <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#b91c1c', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', alignSelf: 'flex-start' }}>
                  Fire Execution Hook
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Dynamic File Sync Module Upload Portal */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '35px', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', color: '#0f172a' }}>Stage 3: Synchronize Module Packages</h3>
            <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5', marginBottom: '24px' }}>Upload deployment scripts directly into active synchronization paths.</p>
            
            <form onSubmit={handleFileUpload} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Package Reference Name</label>
                <input 
                  type="text" 
                  value={uploadFilename}
                  onChange={(e) => setUploadFilename(e.target.value)}
                  placeholder="e.g., node_update.js" 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Module Code Buffer Payload</label>
                <textarea 
                  rows="8"
                  value={uploadContent}
                  onChange={(e) => setUploadContent(e.target.value)}
                  placeholder="// Enter administrative execution instructions here..."
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'monospace' }}
                  required 
                />
              </div>

              {uploadStatus && (
                <div className="mono" style={{ padding: '12px', borderRadius: '4px', fontSize: '13px', border: '1px solid', backgroundColor: uploadStatus.type === 'success' ? '#f0fdf4' : '#fef2f2', borderColor: uploadStatus.type === 'success' ? '#bbf7d0' : '#fecaca', color: uploadStatus.type === 'success' ? '#166534' : '#991b1b' }}>
                  {uploadStatus.text}
                </div>
              )}

              <button type="submit" style={{ padding: '14px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                Push Synchronization Package
              </button>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
