'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// R3F must be client-only — no SSR
const ModelViewer3D = dynamic(
  () => import('@/components/ModelViewer3D').then(m => m.ModelViewer3D),
  { ssr: false }
)

const MODELS = [
  {
    slug: 'crt-fizyman',
    name: 'CRT Computer Monitor',
    creator: 'fizyman',
    license: 'CC Attribution',
    tris: '3,742',
    source: 'https://sketchfab.com/3d-models/crt-computer-monitor-f2ff0013f86e4cd0a2aee183a23bdfee',
    rating: 5,
    verdict: 'Top pick',
    notes: 'Separate screen and shell materials — screen face can receive a live canvas texture independently of the casing. PBR maps (colour, roughness, metallic, normal, AO). 5,800+ downloads. Best candidate.',
  },
  {
    slug: 'crt-james',
    name: 'CRT Monitor',
    creator: 'James.Harness',
    license: 'CC Attribution',
    tris: '1,100',
    source: 'https://sketchfab.com/3d-models/crt-monitor-e2dd2887a8904e4fa3d5a32e2935adb9',
    rating: 4,
    verdict: 'Lightweight',
    notes: 'Very light (1.1k tris), game-ready, Blender + Substance Painter. Screen material separation unknown — needs inspection in a GLTF viewer before committing.',
  },
  {
    slug: 'crt-charlel',
    name: 'RM C7BBR CRT Monitor',
    creator: 'charlel',
    license: 'CC Attribution',
    tris: 'Unknown',
    source: 'https://sketchfab.com/3d-models/crt-monitor-d65167cdb74a458e9931ba3f88f4b5e7',
    rating: 3,
    verdict: 'Worth a look',
    notes: 'Most recent (April 2025). Based on the RM C7BBR — a specific British-made monitor from the 1980s/90s. Distinctive shape. Poly count and material breakdown TBC.',
  },
  {
    slug: 'crt-sga',
    name: 'Compaq S720 Monitor',
    creator: 'SGAstudio',
    license: 'CC Attribution',
    tris: '12,100',
    source: 'https://sketchfab.com/3d-models/crt-monitor-38cb8c4a7ad44611a0dd3da65d977580',
    rating: 3,
    verdict: 'Detailed but heavy',
    notes: 'Based on the Compaq S720. Higher poly count (12k tris) — more detail but heavier for web. Viable with Draco compression.',
  },
  {
    slug: 'crt-setup',
    name: 'Old CRT Computer Setup',
    creator: 'Minute_watchers_64',
    license: 'CC Attribution',
    tris: 'Unknown',
    source: 'https://sketchfab.com/3d-models/old-crt-computer-setup-73afcd4ed95c4eedbec8774512101bcb',
    rating: 3,
    verdict: 'Scene, not object',
    notes: 'Full desk setup with keyboard, mouse, and monitor. Context-rich — could work as a wider establishing scene rather than a close-up hero.',
  },
  {
    slug: 'crt-wireforks',
    name: 'Old School CRT Monitor',
    creator: 'wireforks',
    license: 'CC Attribution',
    tris: '268',
    source: 'https://sketchfab.com/3d-models/old-school-crt-monitor-485c39940aa344ddb80c5a42d4e9241e',
    rating: 2,
    verdict: 'Too simple',
    notes: '268 triangles — essentially a silhouette. Too low-fidelity to hold up as a hero element.',
  },
  {
    slug: 'crt-dio',
    name: 'Old CRT Monitor (PS1 Style)',
    creator: 'Dio Pieretti',
    license: 'CC Attribution',
    tris: '12',
    source: 'https://sketchfab.com/3d-models/old-crt-monitor-model-8a658b94c60140e0bbdfc78f30ac8e2f',
    rating: 1,
    verdict: 'Intentionally rough',
    notes: '12 triangles. Deliberately PS1-era style. Not a quality issue, it\'s the aesthetic — but wrong direction for this project.',
  },
]

export default function ModelViewer() {
  const [index, setIndex] = useState(0)
  const [autoRotate, setAutoRotate] = useState(false)
  const model = MODELS[index]

  return (
    <div style={{
      width: '100vw',
      height: '100dvh',
      background: '#111',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Futura, sans-serif',
      color: '#e0dbd4',
      overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{ padding: '1.25rem 1.5rem 0.75rem', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '0.35em', opacity: 0.3, marginBottom: '0.35rem' }}>
              CRT MODEL REVIEW
            </div>
            <h1 style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.15, margin: 0 }}>
              {model.name}
            </h1>
            <div style={{ fontSize: '11px', opacity: 0.4, marginTop: '0.2rem', letterSpacing: '0.08em' }}>
              by {model.creator}
            </div>
          </div>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.2em', opacity: 0.3 }}>
              {String(index + 1).padStart(2, '0')} / {String(MODELS.length).padStart(2, '0')}
            </div>
            <div style={{
              display: 'inline-block',
              marginTop: '0.4rem',
              padding: '2px 8px',
              borderRadius: '3px',
              fontSize: '9px',
              letterSpacing: '0.15em',
              fontWeight: 700,
              background: model.rating >= 4 ? 'rgba(57,255,102,0.15)' : model.rating === 3 ? 'rgba(255,200,50,0.12)' : 'rgba(255,80,80,0.1)',
              color: model.rating >= 4 ? '#39FF66' : model.rating === 3 ? '#ffc832' : '#ff5050',
              border: `1px solid ${model.rating >= 4 ? 'rgba(57,255,102,0.3)' : model.rating === 3 ? 'rgba(255,200,50,0.25)' : 'rgba(255,80,80,0.2)'}`,
            }}>
              {model.verdict.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '5px', marginTop: '0.9rem' }}>
          {MODELS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === index ? '#e0dbd4' : i < index ? 'rgba(224,219,212,0.4)' : 'rgba(224,219,212,0.12)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.2s ease, background 0.2s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* 3D Viewer */}
      <div style={{
        flex: 1,
        margin: '0 1rem',
        borderRadius: '10px',
        overflow: 'hidden',
        minHeight: 0,
        border: '1px solid rgba(255,255,255,0.07)',
        background: '#1a1a1a',
      }}>
        <ModelViewer3D
          key={model.slug}
          path={`/models/${model.slug}/scene.gltf`}
          autoRotate={autoRotate}
        />
      </div>

      {/* Info + Nav */}
      <div style={{ padding: '0.85rem 1.5rem 1.25rem', flexShrink: 0 }}>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '0.2em', opacity: 0.3, marginBottom: '0.2rem' }}>TRIANGLES</div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>{model.tris}</div>
          </div>
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '0.2em', opacity: 0.3, marginBottom: '0.2rem' }}>LICENSE</div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>{model.license}</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.2em', opacity: 0.3, marginBottom: '0.4rem' }}>FIT</div>
            <div style={{ display: 'flex', gap: '3px', justifyContent: 'flex-end' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: i < model.rating ? '#e0dbd4' : 'rgba(224,219,212,0.12)',
                }} />
              ))}
            </div>
          </div>
        </div>

        <p style={{ fontSize: '11px', lineHeight: 1.65, opacity: 0.5, margin: '0 0 0.85rem' }}>
          {model.notes}
        </p>

        {/* Rotate toggle + source link */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <button
            onClick={() => setAutoRotate(r => !r)}
            style={{
              fontSize: '9px',
              letterSpacing: '0.15em',
              opacity: autoRotate ? 0.7 : 0.25,
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontFamily: 'Futura, sans-serif',
              padding: 0,
            }}
          >
            {autoRotate ? '⏸ STOP ROTATING' : '↻ AUTO-ROTATE'}
          </button>
          <a
            href={model.source}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '9px', letterSpacing: '0.15em', opacity: 0.25, textDecoration: 'none', color: 'inherit' }}
          >
            VIEW ON SKETCHFAB →
          </a>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={() => setIndex(i => Math.max(0, i - 1))}
            disabled={index === 0}
            style={{
              flex: 1, padding: '0.7rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '6px',
              color: index === 0 ? 'rgba(224,219,212,0.18)' : '#e0dbd4',
              fontSize: '11px', letterSpacing: '0.12em',
              cursor: index === 0 ? 'default' : 'pointer',
              fontFamily: 'Futura, sans-serif', fontWeight: 700,
            }}
          >
            ← PREV
          </button>
          <button
            onClick={() => setIndex(i => Math.min(MODELS.length - 1, i + 1))}
            disabled={index === MODELS.length - 1}
            style={{
              flex: 1, padding: '0.7rem',
              background: index === MODELS.length - 1 ? 'rgba(255,255,255,0.05)' : 'rgba(224,219,212,0.1)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '6px',
              color: index === MODELS.length - 1 ? 'rgba(224,219,212,0.18)' : '#e0dbd4',
              fontSize: '11px', letterSpacing: '0.12em',
              cursor: index === MODELS.length - 1 ? 'default' : 'pointer',
              fontFamily: 'Futura, sans-serif', fontWeight: 700,
            }}
          >
            NEXT →
          </button>
        </div>

        <div style={{ fontSize: '9px', opacity: 0.18, textAlign: 'center', marginTop: '0.6rem', letterSpacing: '0.1em' }}>
          DRAG TO ROTATE · SCROLL TO ZOOM
        </div>
      </div>

    </div>
  )
}
