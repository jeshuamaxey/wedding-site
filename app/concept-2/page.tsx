import ConceptNav from '@/components/ConceptNav'

export default function Concept2() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url(/img/concrete-02.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ConceptNav active={2} theme="dark" />

      {/* Vignette to pin focus and keep the poster copy legible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(2rem, 6vw, 5rem)',
          color: '#F0EEEB',
        }}
      >
        <div style={{ fontFamily: 'Futura, sans-serif', fontSize: '10px', letterSpacing: '0.4em', opacity: 0.55, marginBottom: '1.5rem' }}>
          SAVE THE DATE
        </div>
        <h1
          style={{
            fontFamily: "'Monument Extended', sans-serif",
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 900,
            letterSpacing: '0.02em',
            lineHeight: 0.95,
            textTransform: 'uppercase',
            maxWidth: '90vw',
          }}
        >
          Sinéad
          <br />
          &amp; Jeshua
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 'clamp(1rem, 3vw, 2.5rem)',
            flexWrap: 'wrap',
            marginTop: 'clamp(1.5rem, 4vw, 3rem)',
            paddingTop: 'clamp(1.5rem, 4vw, 3rem)',
            borderTop: '1px solid rgba(240,238,235,0.3)',
          }}
        >
          <div
            style={{
              fontFamily: "'Monument Extended', sans-serif",
              fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
              letterSpacing: '0.1em',
              fontWeight: 900,
            }}
          >
            28 · 08 · 2027
          </div>
          <div style={{ fontFamily: 'Futura, sans-serif', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', letterSpacing: '0.25em', opacity: 0.75 }}>
            CONNEMARA, IRELAND
          </div>
          <div style={{ fontFamily: 'Futura, sans-serif', fontSize: '10px', letterSpacing: '0.2em', opacity: 0.4 }}>
            A THREE-DAY EVENT — 26–28 AUGUST 2027
          </div>
        </div>
      </div>
    </div>
  )
}
