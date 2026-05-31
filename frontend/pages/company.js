import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Company() {
  return (
    <div>
      <Navbar />
      
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 40px', minHeight: '80vh' }}>
        <div style={{ marginBottom: '60px' }}>
          <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Corporate Overview</span>
          <h1 style={{ fontSize: '46px', fontWeight: '800', color: '#0f172a', marginTop: '12px', marginBottom: '20px', letterSpacing: '-0.03em' }}>
            Mission & Organizational Strategy
          </h1>
          <p style={{ fontSize: '19px', color: '#475569', lineHeight: '1.6', fontWeight: '400' }}>
            Providing high-assurance infrastructure directory alignment pipelines for secure corporate networks and federated entities globally.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          <section>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '14px', letterSpacing: '-0.01em' }}>Core Mandate</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#334155', margin: 0 }}>
              IdentitySync Global Corporation engineers solutions designed to eliminate runtime configuration drift across disparate cloud deployments and multi-region business networks. We focus on building highly isolated validation pathways that ensure system consistency before transactions interact with backend database layers.
            </p>
          </section>

          <section style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '14px', letterSpacing: '-0.01em' }}>Operational Boundaries Strategy</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#334155', margin: 0 }}>
              Our engineering philosophy relies on the strict segregation of public informational platforms from dynamic internal operations infrastructure. By building standardized, static public layouts, we provide robust institutional communication while keeping interactive diagnostic consoles explicitly partitioned inside monitored infrastructure environments.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
