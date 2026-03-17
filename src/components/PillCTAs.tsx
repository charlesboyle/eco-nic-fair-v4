'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export type PillCTAItem = {
  label: string
  onClick?: () => void
  href?: string
}

interface PillCTAsProps {
  items: PillCTAItem[]
  baseColor?: string
  pillColor?: string
  pillTextColor?: string
  hoveredPillTextColor?: string
  ease?: string
  className?: string
}

export default function PillCTAs({
  items,
  baseColor = '#0D0D0D',
  pillColor = '#F4EFE9',
  pillTextColor,
  hoveredPillTextColor,
  ease = 'power3.out',
  className = '',
}: PillCTAsProps) {
  const resolvedPillText = pillTextColor ?? baseColor
  const resolvedHoverText = hoveredPillTextColor ?? pillColor

  const circleRefs = useRef<Array<HTMLSpanElement | null>>([])
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([])
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([])

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, i) => {
        if (!circle?.parentElement) return
        const pill = circle.parentElement as HTMLElement
        const { width: w, height: h } = pill.getBoundingClientRect()
        const R = ((w * w) / 4 + h * h) / (2 * h)
        const D = Math.ceil(2 * R) + 2
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
        const originY = D - delta

        circle.style.width = `${D}px`
        circle.style.height = `${D}px`
        circle.style.bottom = `-${delta}px`

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` })

        const label = pill.querySelector<HTMLElement>('.pill-label')
        const hover = pill.querySelector<HTMLElement>('.pill-label-hover')
        if (label) gsap.set(label, { y: 0 })
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 })

        tlRefs.current[i]?.kill()
        const tl = gsap.timeline({ paused: true })
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0)
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0)
        if (hover) {
          gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 })
          tl.to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0)
        }
        tlRefs.current[i] = tl
      })
    }

    layout()
    window.addEventListener('resize', layout)
    document.fonts?.ready.then(layout).catch(() => {})
    return () => window.removeEventListener('resize', layout)
  }, [items, ease])

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' })
  }

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' })
  }

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--pill-text': resolvedPillText,
    '--hover-text': resolvedHoverText,
  } as React.CSSProperties

  const basePillClasses =
    'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-medium text-[14px] leading-[0] whitespace-nowrap cursor-pointer px-7'

  return (
    <div
      className={`inline-flex items-center rounded-full p-[3px] ${className}`}
      style={{ ...cssVars, background: 'var(--base)', height: '46px' }}
    >
      <ul className="list-none flex items-stretch gap-[3px] m-0 p-0 h-full">
        {items.map((item, i) => {
          const pillStyle: React.CSSProperties = {
            background: 'var(--pill-bg)',
            color: 'var(--pill-text)',
          }
          const inner = (
            <>
              <span
                className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                style={{ background: 'var(--base)', willChange: 'transform' }}
                aria-hidden="true"
                ref={el => { circleRefs.current[i] = el }}
              />
              <span className="label-stack relative inline-block leading-[1] z-[2]">
                <span className="pill-label relative z-[2] inline-block leading-[1]" style={{ willChange: 'transform' }}>
                  {item.label}
                </span>
                <span
                  className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                  style={{ color: 'var(--hover-text)', willChange: 'transform, opacity' }}
                  aria-hidden="true"
                >
                  {item.label}
                </span>
              </span>
            </>
          )

          return (
            <li key={i} className="flex h-full">
              {item.href ? (
                <a
                  href={item.href}
                  className={basePillClasses}
                  style={pillStyle}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  {inner}
                </a>
              ) : (
                <button
                  className={basePillClasses}
                  style={pillStyle}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                  onClick={item.onClick}
                >
                  {inner}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
