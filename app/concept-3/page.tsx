import ConceptNav from '@/components/ConceptNav'

export default function Concept3() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <ConceptNav active={3} theme="dark" />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/img/tv-glitch-noise.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(1) contrast(1.1)',
          opacity: 0.5,
          mixBlendMode: 'screen',
        }}
      />

      {/* CRT screen glow, matching the password-gate terminal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0,80,0,0.25) 0%, transparent 70%)',
        }}
      />
      {/* Scanlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)',
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 20vw rgba(0,0,0,0.85)',
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
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--green)',
        }}
      >
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.15em',
            opacity: 0.55,
            marginBottom: '2.5rem',
            textShadow: '0 0 8px var(--green-dim)',
          }}
        >
          SINÉAD &amp; JESHUA OS — v1.0.0 · SAVE_THE_DATE.exe
        </div>
        <h1
          style={{
            fontFamily: "'Monument Extended', sans-serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '0.06em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
            color: '#fff',
            textShadow: '0 0 12px var(--green-dim), 0 0 40px rgba(57,255,102,0.25)',
          }}
        >
          Sinéad &amp; Jeshua
        </h1>
        <div
          style={{
            width: '100%',
            maxWidth: '460px',
            height: '1px',
            background: 'var(--green-faint)',
            margin: '2.5rem 0',
            boxShadow: '0 0 8px var(--green-dim)',
          }}
        />
        <div style={{ fontFamily: 'monospace', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', letterSpacing: '0.25em', opacity: 0.85 }}>
          &gt; CONNEMARA, IRELAND
        </div>
        <div
          style={{
            fontFamily: "'Monument Extended', sans-serif",
            fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
            letterSpacing: '0.2em',
            marginTop: '0.75rem',
            fontWeight: 900,
            color: '#fff',
            textShadow: '0 0 8px var(--green-dim)',
          }}
        >
          28 · 08 · 2027
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.15em', opacity: 0.45, marginTop: '2.5rem' }}>
          ! A THREE-DAY EVENT — 26–28 AUGUST 2027
        </div>
      </div>
    </div>
  )
}
