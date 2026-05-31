import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '80px 40px 40px 40px', fontSize: '14px', borderTop: '1px solid #1e293b' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
        <div>
          <div style={{ color: '#ffffff', fontWeight: '700', fontSize: '18px', marginBottom: '16px' }}>IdentitySync Global Corp.</div>
          <p style={{ lineHeight: '1.6', color: '#64748b', maxWidth: '360px' }}>Architecting resilient infrastructure directory coordination matrices and federated consensus engines for enterprise systems worldwide.</p>
        </div>
        <div>
          <div style={{ color: '#ffffff', fontWeight: '600', marginBottom: '16px' }}>Platform</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/platform" style={{ color: '#64748b', textDecoration: 'none' }}>Core Architecture</Link></li>
            <li><Link href="/platform#security" style={{ color: '#64748b', textDecoration: 'none' }}>Compliance Metrics</Link></li>
          </ul>
        </div>
        <div>
          <div style={{ color: '#ffffff', fontWeight: '600', marginBottom: '16px' }}>Corporate</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link href="/company" style={{ color: '#64748b', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link href="/company#leadership" style={{ color: '#64748b', textDecoration: 'none' }}>Executive Leadership</Link></li>
          </ul>
        </div>
      </div>
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingTop: '40px', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#475569' }}>
        <div>&copy; 2026 IdentitySync Global Corporation. All rights reserved. ISO/IEC 27001 Certified Implementation framework.</div>
        <div>Security &amp; Operational Disclosures</div>
      </div>
    </footer>
  );
}
