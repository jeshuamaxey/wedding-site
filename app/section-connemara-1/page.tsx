import SectionNav from '@/components/SectionNav'

export default function SectionConnemara1() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <SectionNav group="connemara" active={1} />

      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundImage: 'url(/img/connemara/lake-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.35) 100%)',
          }}
        />

        <div style={{ position: 'absolute', top: 'clamp(8.5rem, 20vh, 10rem)', left: 'clamp(2rem, 6vw, 5rem)', fontFamily: 'Futura, sans-serif', fontSize: '11px', letterSpacing: '0.35em', color: '#F0EEEB', opacity: 0.7 }}>
          CÉAD MÍLE FÁILTE
        </div>

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
            THE PLACE
          </div>
          <h2
            style={{
              fontFamily: "'Monument Extended', sans-serif",
              fontSize: 'clamp(3rem, 11vw, 9rem)',
              fontWeight: 900,
              letterSpacing: '0.01em',
              lineHeight: 0.9,
              textTransform: 'uppercase',
            }}
          >
            A Savage
            <br />
            Beauty
          </h2>
          {/* <div style={{ fontFamily: 'Futura, sans-serif', fontSize: '11px', letterSpacing: '0.15em', opacity: 0.55, marginTop: '0.75rem' }}>
            &mdash; often attributed to Oscar Wilde, on Connemara
          </div> */}

          <p
            style={{
              fontFamily: 'Futura, sans-serif',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              lineHeight: 1.7,
              maxWidth: '52ch',
              opacity: 0.9,
              marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
              paddingTop: 'clamp(1.5rem, 3vw, 2.5rem)',
              borderTop: '1px solid rgba(240,238,235,0.3)',
            }}
          >
            We’re all going to one of the most beautiful places in the world: Connemara.

            <br />
            <br />

            It is the wild, rugged, earthy edge of Ireland. A dramatic backdrop that rewards ramblers, explorers and anyone with a keen sense of beauty and awe. It has an ample supply of fresh air, Guinness and poetry. Oscar Wilde described it as a “savage beauty”.

            <br />
            <br />

            It is the scene stealing backdrop to our wedding weekend.

          </p>
        </div>
      </div>
    </div>
  )
}
