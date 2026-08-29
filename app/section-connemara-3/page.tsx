import SectionNav from '@/components/SectionNav'

export default function SectionConnemara3() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative', background: '#000' }}>
      <SectionNav group="connemara" active={3} />

      {/* Mosaic grid */}
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr 1fr',
          gridTemplateRows: '1fr 1fr',
          height: '78vh',
          minHeight: '520px',
        }}
      >
        <div style={{ gridColumn: 1, gridRow: 1, backgroundImage: 'url(/img/connemara/lake-2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ gridColumn: 2, gridRow: '1 / 3', backgroundImage: 'url(/img/connemara/beach.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ gridColumn: 3, gridRow: 1, backgroundImage: 'url(/img/connemara/road.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ gridColumn: 1, gridRow: 2, backgroundImage: 'url(/img/connemara/lake-3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ gridColumn: 3, gridRow: 2, backgroundImage: 'url(/img/connemara/lake-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

        {/* Stacked brutal type, blended across the seams */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(6.5rem, 15vh, 7.5rem) 0 clamp(1rem, 3vw, 2rem)',
            pointerEvents: 'none',
            mixBlendMode: 'difference',
          }}
        >
          {['Stone.', 'Bog.', 'Atlantic.'].map((word, i) => (
            <div
              key={word}
              style={{
                fontFamily: "'Monument Extended', sans-serif",
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#fff',
                lineHeight: 1,
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                textAlign: i === 1 ? 'center' : i === 0 ? 'left' : 'right',
                padding: '0 clamp(1rem, 4vw, 3rem)',
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

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
