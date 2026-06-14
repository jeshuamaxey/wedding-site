'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

type Stage = 'terminal' | 'expanding' | 'loading' | 'site'

const PASSWORD = 'kerrygold'
const BLOCK = '█'
const BAR_WIDTH = 22

interface LoadingEntry {
  text: string
  fail?: true
  failMessage?: string
}

const LOADING_POOL: LoadingEntry[] = [
  { text: 'Loading good craic' },
  { text: 'Loading my love for Sinéad (this could take a while)' },
  {
    text: 'Loading a sunny day in Ireland',
    fail: true,
    failMessage: 'ERROR: CANNOT GUARANTEE SUN IN IRELAND',
  },
  { text: 'Loading Irish pubs vs UK pubs discourse' },
  { text: 'Loading an over-engineered wedding website' },
  { text: 'Loading the courage to get in the sea on day 2' },
]


function makeBar(progress: number): string {
  const filled = Math.round(progress * BAR_WIDTH)
  return `[${BLOCK.repeat(filled)}${' '.repeat(BAR_WIDTH - filled)}]`
}

export default function Home() {
  const [stage, setStage] = useState<Stage>('terminal')
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [blink, setBlink] = useState(true)
  const [loadingEntry] = useState<LoadingEntry>(
    () => LOADING_POOL[Math.floor(Math.random() * LOADING_POOL.length)]
  )
  const [progress, setProgress] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState<'running' | 'fail' | 'done'>('running')
  const [siteVisible, setSiteVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)


  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530)
    return () => clearInterval(t)
  }, [])

  // Focus hidden input on terminal stage
  useEffect(() => {
    if (stage === 'terminal') inputRef.current?.focus()
  }, [stage])

  const handleSubmit = useCallback(() => {
    if (input.toLowerCase() === PASSWORD) {
      setError('')
      setStage('expanding')
      setTimeout(() => {
        setStage('loading')
      }, 900)
    } else {
      setError('ACCESS DENIED. TRY AGAIN.')
      setInput('')
    }
  }, [input])

  // Loading bar animation
  useEffect(() => {
    if (stage !== 'loading') return
    const duration = 3000
    const tick = 40
    let step = 0
    const total = duration / tick

    const timer = setInterval(() => {
      step++
      const p = Math.min(step / total, 1)
      setProgress(p)
      if (p >= 1) {
        clearInterval(timer)
        if (loadingEntry.fail) {
          setLoadingPhase('fail')
          setTimeout(revealSite, 2000)
        } else {
          setLoadingPhase('done')
          setTimeout(revealSite, 800)
        }
      }
    }, tick)

    return () => clearInterval(timer)
  }, [stage, loadingEntry])

  function revealSite() {
    setStage('site')
    setTimeout(() => setSiteVisible(true), 80)
  }

  const isExpanded = stage !== 'terminal'
  const pct = Math.round(progress * 100)

  // Terminal overlay fades out once site is visible
  const terminalOpacity = stage === 'site' ? (siteVisible ? 0 : 1) : 1

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: 'var(--concrete)' }}>

      {/* Site content — light grey background, revealed beneath terminal */}
      <div style={{
        position: 'fixed', inset: 0,
        background: siteVisible ? '#F0EEEB' : 'var(--concrete)',
        transition: 'background 1.2s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Futura, sans-serif',
        color: '#0a0a0a',
        zIndex: 1,
      }}>
        <div style={{ textAlign: 'center', opacity: siteVisible ? 1 : 0, transition: 'opacity 1.2s ease' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.4em', opacity: 0.35, marginBottom: '3rem' }}>
            SAVE THE DATE
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '0.06em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
          }}>
            Sinéad &amp; Jeshua
          </h1>
          <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.15)', margin: '2.5rem 0' }} />
          <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', letterSpacing: '0.25em', opacity: 0.6 }}>
            CONNEMARA, IRELAND
          </div>
          <div style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', letterSpacing: '0.2em', marginTop: '0.75rem', fontWeight: 700 }}>
            28 · 08 · 2027
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', opacity: 0.3, marginTop: '2.5rem' }}>
            A THREE-DAY EVENT — 26–28 AUGUST 2027
          </div>
        </div>
      </div>

      {/* CRT Monitor — animates from centred box to fullscreen, then fades out */}
      <div
        onClick={() => stage === 'terminal' && inputRef.current?.focus()}
        style={{
          position: 'fixed',
          inset: isExpanded
            ? '0px'
            : 'calc(50vh - 240px) calc(50vw - 320px)',
          borderRadius: isExpanded ? '0px' : '18px',
          backgroundColor: stage === 'site' ? '#000' : isExpanded ? '#000' : '#CBC6B8',
          padding: isExpanded ? '0px' : '38px 34px 58px',
          boxShadow: isExpanded
            ? 'none'
            : '0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.2)',
          opacity: terminalOpacity,
          transition: [
            'inset 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
            'border-radius 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
            'background-color 0.85s ease',
            'padding 0.85s ease',
            'box-shadow 0.85s ease',
            'opacity 1.2s ease',
          ].join(', '),
          zIndex: stage === 'site' ? 2 : 10,
          pointerEvents: stage === 'site' ? 'none' : 'auto',
          overflow: 'hidden',
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            borderRadius: isExpanded ? '0' : '6px',
            transition: 'border-radius 0.85s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Scanlines */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.13) 2px, rgba(0,0,0,0.13) 4px)',
          }} />
          {/* Screen glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
            background: 'radial-gradient(ellipse at 50% 40%, rgba(0,80,0,0.15) 0%, transparent 70%)',
          }} />

          {/* Terminal content */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            padding: '2rem',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.7',
            color: 'var(--green)',
            textShadow: '0 0 8px var(--green-dim)',
          }}>

            {/* PASSWORD STAGE */}
            {(stage === 'terminal' || stage === 'expanding') && (
              <div style={{ width: '100%', maxWidth: '460px' }}>
                <div style={{ opacity: 0.45, fontSize: '10px', letterSpacing: '0.15em', marginBottom: '1.8rem' }}>
                  SINÉAD & JESHUA OS — v1.0.0
                </div>
                <div>&gt; ENTER SITE ACCESS CODE:</div>
                <div style={{ marginTop: '0.4rem' }}>
                  &gt;&nbsp;
                  <span style={{ letterSpacing: '0.25em' }}>{'*'.repeat(input.length)}</span>
                  <span style={{ opacity: blink ? 1 : 0 }}>█</span>
                </div>
                {error && (
                  <div style={{ marginTop: '1.2rem', color: 'var(--red-terminal)', textShadow: '0 0 8px rgba(255,68,68,0.5)' }}>
                    ! {error}
                  </div>
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  onChange={e => { setInput(e.target.value); setError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
                />
              </div>
            )}

            {/* LOADING STAGE */}
            {stage === 'loading' && (
              <div style={{ width: '100%', maxWidth: '560px' }}>
                <div style={{ opacity: 0.45, fontSize: '10px', letterSpacing: '0.15em', marginBottom: '1.8rem' }}>
                  SINÉAD & JESHUA OS — v1.0.0
                </div>
                {loadingPhase === 'fail' ? (
                  <>
                    <div style={{ opacity: 0.35, textDecoration: 'line-through' }}>
                      {makeBar(1)} 100% {loadingEntry.text}
                    </div>
                    <div style={{ marginTop: '0.8rem', color: 'var(--red-terminal)', textShadow: '0 0 8px rgba(255,68,68,0.5)' }}>
                      ! {loadingEntry.failMessage}
                    </div>
                  </>
                ) : (
                  <div style={{ whiteSpace: 'pre' }}>
                    {makeBar(progress)} {String(pct).padStart(3, ' ')}% {loadingEntry.text}
                    {loadingPhase === 'done' ? ' ............ done' : ''}
                  </div>
                )}
              </div>
            )}

            {/* SITE STAGE — rendered outside the terminal overlay below */}

          </div>
        </div>
      </div>

    </div>
  )
}
