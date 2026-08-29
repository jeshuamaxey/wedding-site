import SectionNav from '@/components/SectionNav'

export default function SectionCouple3() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <SectionNav group="couple" active={3} />

      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/img/jesh-and-sinead/jesh-morrocco.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 68%',
            clipPath: 'polygon(0 0, 62% 0, 38% 100%, 0 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/img/jesh-and-sinead/sb-cam-venice.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            clipPath: 'polygon(62% 0, 100% 0, 100% 100%, 38% 100%)',
          }}
        />
        {/* Seam line */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(105deg, transparent calc(50% - 1px), rgba(240,238,235,0.4) 50%, transparent calc(50% + 1px))',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.35) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(2rem, 6vw, 5rem)',
            color: '#F0EEEB',
          }}
        >
          <div style={{ fontFamily: 'Futura, sans-serif', fontSize: '10px', letterSpacing: '0.4em', opacity: 0.6, marginBottom: '1.5rem' }}>
            THE COUPLE
          </div>
          <h2
            style={{
              fontFamily: "'Monument Extended', sans-serif",
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 900,
              letterSpacing: '0.01em',
              lineHeight: 0.95,
              textTransform: 'uppercase',
              maxWidth: '20ch',
            }}
          >
            Us
          </h2>

          <p
            style={{
              fontFamily: 'Futura, sans-serif',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              lineHeight: 1.6,
              maxWidth: '46ch',
              opacity: 0.85,
              marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            We met in London in 2021. Since then we&rsquo;ve seen the world together. From Dingle to Lyme Regis,
            truly, we&rsquo;ve seen it all. Completed it. Tick. All that&rsquo;s left is to get wed.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
              paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
              borderTop: '1px solid rgba(240,238,235,0.3)',
            }}
          >
            <div
              style={{
                fontFamily: "'Monument Extended', sans-serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                letterSpacing: '0.04em',
                fontWeight: 900,
                maxWidth: '38ch',
              }}
            >
              We&rsquo;re getting married. You are invited.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
