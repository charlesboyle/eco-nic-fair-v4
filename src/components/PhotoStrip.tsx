'use client'

import { useRef, useEffect, useState } from 'react'

// All clean-named paths (no spaces)
const STRIP_IMAGES = [
  '/assets/econic-25/IMG_6569.png',
  '/assets/econic-25/IMG_6575-2.jpg',
  '/assets/econic-25/IMG_6594-2.png',
  '/assets/econic-25/IMG_6615.png',
  '/assets/econic-25/IMG_6723.png',
  '/assets/econic-25/econic-screenshot.png',
]

const ALL    = [...STRIP_IMAGES, ...STRIP_IMAGES, ...STRIP_IMAGES]
const TILE_W = 160
const TILE_H = 220
const GAP    = 10
const STRIDE = STRIP_IMAGES.length * (TILE_W + GAP)

const HN = '"Helvetica Neue", Helvetica, Arial, sans-serif'

export default function PhotoStrip() {
  const outerRef   = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)
  const isDragging = useRef(false)
  const dragX      = useRef(0)
  const [grabbing, setGrabbing] = useState(false)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return
    el.scrollLeft = STRIDE

    const tick = () => {
      if (!isDragging.current && el) {
        el.scrollLeft += 0.6
        if (el.scrollLeft >= STRIDE * 2) el.scrollLeft -= STRIDE
        if (el.scrollLeft <= 0) el.scrollLeft += STRIDE
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true; dragX.current = e.clientX; setGrabbing(true)
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !outerRef.current) return
    const dx = dragX.current - e.clientX
    outerRef.current.scrollLeft += dx
    dragX.current = e.clientX
    if (outerRef.current.scrollLeft >= STRIDE * 2) outerRef.current.scrollLeft -= STRIDE
    if (outerRef.current.scrollLeft <= 0) outerRef.current.scrollLeft += STRIDE
  }
  function onMouseUp() { isDragging.current = false; setGrabbing(false) }

  function onTouchStart(e: React.TouchEvent) {
    isDragging.current = true; dragX.current = e.touches[0].clientX
  }
  function onTouchMove(e: React.TouchEvent) {
    if (!isDragging.current || !outerRef.current) return
    const dx = dragX.current - e.touches[0].clientX
    outerRef.current.scrollLeft += dx
    dragX.current = e.touches[0].clientX
    if (outerRef.current.scrollLeft >= STRIDE * 2) outerRef.current.scrollLeft -= STRIDE
    if (outerRef.current.scrollLeft <= 0) outerRef.current.scrollLeft += STRIDE
  }
  function onTouchEnd() { isDragging.current = false }

  return (
    // Outer section — gradient bridges white (Section2) to cream (HowItWorks)
    <section
      style={{
        background: 'linear-gradient(to bottom, #F5F0E8 0%, #ffffff 100%)',
        paddingTop: 16,
        paddingBottom: 36,
      }}
    >
      {/* Caption */}
      <div style={{ textAlign: 'center', marginBottom: 20, paddingInline: 24 }}>
        <p style={{ fontFamily: "'BethanyElingston', Georgia, serif", fontSize: 'clamp(18px, 3vw, 26px)', color: '#555', lineHeight: 1.2 }}>
          Memories from Eco-nic Fair &lsquo;25
        </p>
      </div>

      {/* Draggable scroll strip */}
      <div
        ref={outerRef}
        style={{
          height: TILE_H,
          overflowX: 'scroll',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          cursor: grabbing ? 'grabbing' : 'grab',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div style={{ display: 'flex', gap: GAP, paddingInline: 16, width: 'max-content', height: TILE_H, userSelect: 'none', alignItems: 'center' }}>
          {ALL.map((src, i) => (
            <div key={i} style={{ width: TILE_W, height: TILE_H - 16, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                draggable={false}
                loading="eager"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', pointerEvents: 'none' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
