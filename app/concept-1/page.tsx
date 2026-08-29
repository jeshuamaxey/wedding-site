import ConceptNav from '@/components/ConceptNav'

export default function Concept1() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url(/img/concrete-01.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ConceptNav active={1} theme="light" />

      {/* Soft light wash so text stays legible on the texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.7) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#0a0a0a',
          padding: '2rem',
        }}
      >
        <div>
          <div style={{ fontFamily: 'Futura, sans-serif', fontSize: '10px', letterSpacing: '0.4em', opacity: 0.4, marginBottom: '3rem' }}>
            SAVE THE DATE
          </div>
          <h1
            style={{
              fontFamily: "'Monument Extended', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '0.06em',
              lineHeight: 1.1,
              textTransform: 'uppercase',
            }}
          >
            Sinéad &amp; Jeshua
          </h1>
          <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.15)', margin: '2.5rem 0' }} />
          <div style={{ fontFamily: 'Futura, sans-serif', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', letterSpacing: '0.25em', opacity: 0.6 }}>
            CONNEMARA, IRELAND
          </div>
          <div
            style={{
              fontFamily: "'Monument Extended', sans-serif",
              fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
              letterSpacing: '0.2em',
              marginTop: '0.75rem',
              fontWeight: 900,
            }}
          >
            28 · 08 · 2027
          </div>
          <div style={{ fontFamily: 'Futura, sans-serif', fontSize: '10px', letterSpacing: '0.2em', opacity: 0.3, marginTop: '2.5rem' }}>
            A THREE-DAY EVENT — 26–28 AUGUST 2027
          </div>
        </div>
      </div>
    </div>
  )
}
