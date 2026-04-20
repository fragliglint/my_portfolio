// file: components/Footer.js
"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section" style={{ borderTop: '1px solid var(--border-glass)', padding: '40px 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div className="logo-boxed">SN</div>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p>© {currentYear} Sifat Noor Siam. All rights reserved.</p>
          <p style={{ marginTop: '10px' }}>Built with Next.js & Vanilla CSS</p>
        </div>
      </div>
    </footer>
  );
}
