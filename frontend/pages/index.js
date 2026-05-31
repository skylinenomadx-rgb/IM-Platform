import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Navbar />
      
      {/* Premium B2B Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', padding: '120px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'center' }}>
          <div style={{ flex: '1.2' }}>
            <h1 style={{ fontSize: '54px', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-0.04em', margin: '0 0 24px 0' }}>
              Federated Identity Platforms for Global Infrastructure.
            </h1>
            <p style={{ fontSize: '20px', color: '#94a3b8', lineHeight: '1.6', margin: '0 0 40px 0', fontWeight: '400', maxWidth: '640px' }}>
              Coordinate distributed directory systems, cross-replicate real-time active registries, and enforce granular authorization mapping across independent cloud environments.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="/platform" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '16px 32px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}>
                View System Specs
              </Link>
              <Link href="/company" style={{ backgroundColor: 'transparent', color: '#ffffff', padding: '16px 32px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', border: '1px solid #475569' }}>
                Corporate Profile
              </Link>
            </div>
          </div>
          <div style={{ flex: '0.8', display: 'flex', justifyContent: 'center' }}>
            <img 
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" 
              alt="Systems Integration Architecture" 
              style={{ width: '100%', maxWidth: '500px', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
            />
          </div>
        </div>
      </section>

      {/* Structural Value Proposition Matrix */}
      <section style={{ padding: '100px 40px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ maxWidth: '600px', marginBottom: '60px' }}>
            <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enterprise Solutions</span>
            <h2 style={{ fontSize: '36px', fontWeight: '700', color: '#0f172a', marginTop: '8px', letterSpacing: '-0.02em' }}>Designed for High-Availability Operations</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e40af', marginBottom: '12px' }}>01 / Directory Replication</div>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>Maintain transactional ledger symmetry across geographically isolated node networks through persistent schema synchronization vectors.</p>
            </div>
            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e40af', marginBottom: '12px' }}>02 / Consensus Engines</div>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>Eliminate split-brain resolution failure using sub-millisecond heartbeat handshakes across private data clusters.</p>
            </div>
            <div style={{ padding: '10px' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e40af', marginBottom: '12px' }}>03 / Access Decoupling</div>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>Isolate underlying core identity databases from direct client interactions via unified asynchronous network pipelines.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
