'use client'

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'

type Stage = 'checking' | 'terminal' | 'expanding' | 'loading' | 'site'

const PASSWORD = 'kerrygold'
const STORAGE_KEY = 'sinead-jeshua-access'
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
  const [stage, setStage] = useState<Stage>('checking')
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

  // Check for a previously granted access pass so returning visitors skip the gate.
  // useLayoutEffect avoids a flash of the terminal before we know the answer.
  useLayoutEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === 'granted') {
      setStage('site')
      setSiteVisible(true)
    } else {
      setStage('terminal')
    }
  }, [])

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530)
    return () => clearInterval(t)
  }, [])

  // Focus hidden input on terminal stage
  useEffect(() => {
    if (stage === 'terminal') inputRef.current?.focus()
  }, [stage])

  // Lock page scroll until the gate is passed, so the terminal can't be scrolled past
  useEffect(() => {
    const unlocked = stage === 'site'
    document.documentElement.style.overflow = unlocked ? 'auto' : 'hidden'
    document.body.style.overflow = unlocked ? 'auto' : 'hidden'
  }, [stage])

  const handleSubmit = useCallback(() => {
    if (input.toLowerCase() === PASSWORD) {
      setError('')
      window.localStorage.setItem(STORAGE_KEY, 'granted')
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
    <div style={{ width: '100vw', position: 'relative', background: 'var(--concrete)' }}>

      {/* Site content — dark concrete poster, revealed beneath terminal */}
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: 'url(/img/concrete-02.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1,
      }}>
        {/* Vignette to pin focus and keep the poster copy legible */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.5) 100%)',
        }} />

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: 'clamp(2rem, 6vw, 5rem)',
          color: '#F0EEEB',
          opacity: siteVisible ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}>
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

      {/* The Couple — diagonal split of two solo shots */}
      <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
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
            position: 'absolute',
            inset: 0,
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

      {/* Connemara — the place, a savage beauty */}
      <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
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

          <div style={{ position: 'absolute', top: 'clamp(2rem, 6vw, 5rem)', left: 'clamp(2rem, 6vw, 5rem)', fontFamily: 'Futura, sans-serif', fontSize: '11px', letterSpacing: '0.35em', color: '#F0EEEB', opacity: 0.7 }}>
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
              We&rsquo;re all going to one of the most beautiful places in the world: Connemara.

              <br />
              <br />

              It is the wild, rugged, earthy edge of Ireland. A dramatic backdrop that rewards ramblers, explorers
              and anyone with a keen sense of beauty and awe. It has an ample supply of fresh air, Guinness and
              poetry. Oscar Wilde described it as a &ldquo;savage beauty&rdquo;.

              <br />
              <br />

              It is the scene stealing backdrop to our wedding weekend.
            </p>
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
