import Link from 'next/link'

const CONCEPTS = [
  { href: '/concept-1', label: '01 — LIGHT' },
  { href: '/concept-2', label: '02 — DARK' },
  { href: '/concept-3', label: '03 — GLITCH' },
]

export default function ConceptNav({ active, theme = 'dark' }: { active: 1 | 2 | 3; theme?: 'dark' | 'light' }) {
  const fg = theme === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'
  const fgActive = theme === 'dark' ? '#fff' : '#0a0a0a'
  const bg = theme === 'dark' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.5)'
  const border = theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'

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
        background: bg,
        border: `1px solid ${border}`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'Futura, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.15em',
          color: fg,
          textDecoration: 'none',
          padding: '0.5rem 0.9rem',
        }}
      >
        ← HOME
      </Link>
      {CONCEPTS.map((c, i) => {
        const isActive = active === i + 1
        return (
          <Link
            key={c.href}
            href={c.href}
            style={{
              fontFamily: 'Futura, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: isActive ? fgActive : fg,
              textDecoration: 'none',
              padding: '0.5rem 0.9rem',
              borderRadius: '999px',
              background: isActive ? (theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)') : 'transparent',
              fontWeight: isActive ? 700 : 400,
            }}
          >
            {c.label}
          </Link>
        )
      })}
    </nav>
  )
}
