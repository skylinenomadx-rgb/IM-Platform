import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  
  const linkStyle = (path) => ({
    color: router.pathname === path ? '#2563eb' : '#475569',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: router.pathname === path ? '600' : '500',
    transition: 'color 0.2s ease'
  });

  return (
    <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ backgroundColor: '#1e40af', color: '#ffffff', padding: '10px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '18px', letterSpacing: '-0.03em' }}>IS</div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>IdentitySync Global</span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          <Link href="/" style={linkStyle('/')}>Solutions</Link>
          <Link href="/platform" style={linkStyle('/platform')}>Platform Architecture</Link>
          <Link href="/company" style={linkStyle('/company')}>Company Profile</Link>
          <Link href="/console" style={{ backgroundColor: '#1e40af', color: '#ffffff', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: 'background-color 0.2s', boxShadow: '0 4px 6px -1px rgba(30, 64, 175, 0.15)' }}>
            Operator Portal
          </Link>
        </nav>
      </div>
    </header>
  );
}
