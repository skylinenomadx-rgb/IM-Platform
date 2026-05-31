import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Platform() {
  return (
    <div>
      <Navbar />
      
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '100px 40px', minHeight: '80vh' }}>
        <div style={{ maxWidth: '800px', marginBottom: '60px' }}>
          <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Technical Architecture Specification</span>
          <h1 style={{ fontSize: '46px', fontWeight: '800', color: '#0f172a', marginTop: '12px', marginBottom: '20px', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
            High-Assurance Distributed Directory Mappings
          </h1>
          <p style={{ fontSize: '19px', color: '#475569', lineHeight: '1.6', fontWeight: '400' }}>
            An engineering analysis of the transactional consensus mechanisms, asynchronous state verification engines, and cryptographic directory validation matrices driving IdentitySync clusters.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '60px', alignItems: 'flex-start' }}>
          <div>
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '14px', letterSpacing: '-0.01em' }}>1. Asynchronous Boundary Isolation</h2>
              <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.7', marginBottom: '16px' }}>
                The core synchronization layer enforces strict programmatic isolation boundaries between standard client request parsing pipelines and underlying relational storage nodes. When a diagnostic entry lookup query is initialized via the administrative edge interface, the application translates incoming strings into isolated query operations parameters.
              </p>
              <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.7' }}>
                This decoupling ensures that runtime execution context transitions remain fully uniform across independent cloud zones, isolating primary configuration tables from direct multi-tenant connection loops.
              </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '14px', letterSpacing: '-0.01em' }}>2. Multi-Region Replication Schema Consensus</h2>
              <p style={{ color: '#334155', fontSize: '16px', lineHeight: '1.7' }}>
                To mitigate database drift conditions without inducing localized pipeline locks, transaction nodes utilize specialized validation hashes generated deterministically upon machine registration routines. Record schemas are cross-referenced across clusters natively using distributed heartbeat handshakes, maintaining active ledger integrity even during rolling partition drops or unexpected boundary validation mismatches.
              </p>
            </section>
          </div>
          
          <aside style={{ backgroundColor: '#f8fafc', padding: '36px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '700', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Compliance Matrix</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#475569', fontWeight: '500' }}>
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Standard:</span> <strong style={{ color: '#0f172a' }}>ISO/IEC 27001</strong>
              </div>
              <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Attestation:</span> <strong style={{ color: '#0f172a' }}>SOC 2 Type II</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Framework:</span> <strong style={{ color: '#0f172a' }}>NIST SP 800-53</strong>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
