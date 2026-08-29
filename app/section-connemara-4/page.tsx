import SectionNav from '@/components/SectionNav'

export default function SectionConnemara4() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative', background: '#000' }}>
      <SectionNav group="connemara" active={4} />

      {/* Full-bleed map */}
      <div
        style={{
          position: 'relative',
          backgroundImage: 'url(/img/connemara/connemara-map.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '78vh',
          minHeight: '520px',
        }}
      />

      {/* Copy band */}
      <div
        style={{
          background: '#0a0a0a',
          color: '#F0EEEB',
          padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 6vw, 5rem)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '56ch', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Futura, sans-serif', fontSize: '11px', letterSpacing: '0.35em', opacity: 0.6, marginBottom: '1.25rem' }}>
            CÉAD MÍLE FÁILTE &mdash; A HUNDRED THOUSAND WELCOMES
          </div>
          <p style={{ fontFamily: 'Futura, sans-serif', fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)', lineHeight: 1.7, opacity: 0.9 }}>
            Connemara is the wild edge of Ireland &mdash; bog, granite and Atlantic light, where the Twelve Bens rise
            straight out of the heather and the weather changes its mind every ten minutes. Rugged, remote, and
            exactly where we wanted to say &ldquo;I do.&rdquo;
          </p>
        </div>
      </div>
    </div>
  )
}
