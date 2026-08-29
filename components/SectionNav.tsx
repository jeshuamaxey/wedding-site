import Link from 'next/link'

const GROUPS = {
  couple: [
    { href: '/section-couple-1', label: '01 — SPLIT DUO' },
    { href: '/section-couple-2', label: '02 — FRAMED INSET' },
    { href: '/section-couple-3', label: '03 — DIAGONAL' },
  ],
  connemara: [
    { href: '/section-connemara-1', label: '01 — SAVAGE BEAUTY' },
    { href: '/section-connemara-2', label: '02 — CROPPED TYPE' },
    { href: '/section-connemara-3', label: '03 — MOSAIC' },
    { href: '/section-connemara-4', label: '04 — MAP' },
  ],
} as const

export default function SectionNav({ group, active }: { group: keyof typeof GROUPS; active: 1 | 2 | 3 | 4 }) {
  const items = GROUPS[group]
  const otherGroup = group === 'couple' ? { href: '/section-connemara-1', label: 'CONNEMARA →' } : { href: '/section-couple-1', label: '← THE COUPLE' }

  return (
    <nav
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        gap: '0.25rem',
        padding: '0.35rem',
        borderRadius: '999px',
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '92vw',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'Futura, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.55)',
          textDecoration: 'none',
          padding: '0.5rem 0.9rem',
        }}
      >
        ← HOME
      </Link>
      {items.map((item, i) => {
        const isActive = active === i + 1
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              fontFamily: 'Futura, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              padding: '0.5rem 0.9rem',
              borderRadius: '999px',
              background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
              fontWeight: isActive ? 700 : 400,
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </Link>
        )
      })}
      <Link
        href={otherGroup.href}
        style={{
          fontFamily: 'Futura, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none',
          padding: '0.5rem 0.9rem',
          borderLeft: '1px solid rgba(255,255,255,0.15)',
          whiteSpace: 'nowrap',
        }}
      >
        {otherGroup.label}
      </Link>
    </nav>
  )
}
