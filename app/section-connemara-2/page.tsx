import SectionNav from '@/components/SectionNav'

export default function SectionConnemara2() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <SectionNav group="connemara" active={2} />

      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundImage: 'url(/img/connemara/road.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />

        {/* Giant type, deliberately bleeding off both edges */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            padding: '2.5rem 0',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          }}
        >
          <div
            style={{
              fontFamily: "'Monument Extended', sans-serif",
              fontWeight: 900,
              textTransform: 'uppercase',
              color: '#F0EEEB',
              letterSpacing: '0.01em',
              lineHeight: 1,
              fontSize: 'clamp(4rem, 16vw, 13rem)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Connemara
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            padding: 'clamp(2rem, 6vw, 4rem)',
          }}
        >
          <div style={{ maxWidth: '48ch', textAlign: 'center', color: '#F0EEEB' }}>
            <div style={{ fontFamily: 'Futura, sans-serif', fontSize: '11px', letterSpacing: '0.35em', opacity: 0.7, marginBottom: '1.25rem' }}>
              CÉAD MÍLE FÁILTE &mdash; A HUNDRED THOUSAND WELCOMES
            </div>
            <p
              style={{
                fontFamily: 'Futura, sans-serif',
                fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
                lineHeight: 1.7,
                opacity: 0.9,
              }}
            >
              Bog, granite and Atlantic light, where the Twelve Bens rise straight out of the heather and the
              weather changes its mind every ten minutes. Rugged, remote, and exactly where we wanted to say
              &ldquo;I do.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
