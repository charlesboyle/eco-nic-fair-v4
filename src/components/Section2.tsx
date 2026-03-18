'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { CONTENT_MAX_W } from '@/lib/config'

gsap.registerPlugin(ScrollTrigger)

const GREEN = '#2B6E3A'
const BETHANY = "'BethanyElingston', Georgia, serif"
const HN = '"Helvetica Neue", Helvetica, Arial, sans-serif'

const SHELF_PRODUCTS = [
  { name: 'Hande', ctm: '₹1,163', img: '/assets/product-hande.webp' },
  { name: 'Birce', ctm: '₹1,085', img: '/assets/product-birce.webp' },
  { name: 'Rodel', ctm: '₹1,163', img: '/assets/product-rodel.webp' },
]

function ProductShelf() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} style={{ display: 'flex', gap: 12, marginTop: 24, marginBottom: 28 }}>
      {SHELF_PRODUCTS.map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.08 }}
          style={{ flex: 1, minWidth: 0, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.10)', position: 'relative', aspectRatio: '3/4' }}
        >
          <Image src={p.img} alt={p.name} fill sizes="(max-width: 768px) 33vw, 200px" style={{ objectFit: 'cover' }} />
          {/* Gradient scrim */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)', pointerEvents: 'none' }} />
          {/* Label */}
          <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, pointerEvents: 'none' }}>
            <div style={{ fontFamily: HN, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.75)', lineHeight: 1.2 }}>{p.name}</div>
            <div style={{ fontFamily: HN, fontSize: 13, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.2px' }}>{p.ctm}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function W({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\s+)/).map((part, i) =>
        part.match(/^\s+$/) ? part : (
          <span key={i} className="word inline-block">{part}</span>
        )
      )}
    </>
  )
}

function WI({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\s+)/).map((part, i) =>
        part.match(/^\s+$/) ? part : (
          <span key={i} className="word inline-block font-sub italic">{part}</span>
        )
      )}
    </>
  )
}

/* ─── Big pill toggle — Bethany font only ─── */
function CostToMakeToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  // Proportions derived from Figma: padding=12, gap=18, border-radius=60
  const H = 60, PAD = 6, KNOB = H - PAD * 2  // knob = 48px, tighter padding
  const GAP = 12
  const TEXT_PAD = 12  // inner L/R padding within text area
  const TEXT_W = 90   // text zone width
  const W_PX = PAD + TEXT_W + GAP + KNOB + PAD  // hugs content

  return (
    <motion.button
      onClick={onToggle}
      className="relative flex-shrink-0 focus:outline-none cursor-pointer"
      style={{ width: W_PX, height: H, borderRadius: 60, border: 'none', background: 'transparent', padding: 0 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
    >
      {/* ON background */}
      <motion.div
        className="absolute inset-0"
        style={{
          borderRadius: 60,
          backgroundColor: '#009245',
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 26.92%, rgba(0,0,0,0.2) 100%)',
          boxShadow: 'inset 0px 6px 21px rgba(0,0,0,0.15)',
        }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* OFF background */}
      <motion.div
        className="absolute inset-0"
        style={{
          borderRadius: 60,
          backgroundColor: '#DDDDDD',
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0) 26.92%, rgba(0,0,0,0.1) 100%)',
          boxShadow: 'inset 0px 6px 21px rgba(0,0,0,0.15)',
        }}
        animate={{ opacity: on ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Border overlay — multiply blend so it blends into the pill colour */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 60,
          border: `1.5px solid ${on ? '#48BE80' : '#C0C0C0'}`,
          mixBlendMode: 'multiply',
          transition: 'border-color 0.35s ease',
        }}
      />

      {/* Knob — slides left↔right */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full bg-white overflow-hidden"
        style={{
          width: KNOB, height: KNOB, top: PAD,
          boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
          fontSize: KNOB * 0.55,
        }}
        animate={{ x: on ? W_PX - KNOB - PAD : PAD }}
        transition={{ type: 'spring', stiffness: 420, damping: 33 }}
      >
        <AnimatePresence mode="wait">
          {on ? (
            <motion.span
              key="on"
              initial={{ scale: 0, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28, delay: 0.05 }}
              style={{ lineHeight: 1 }}
            >
              🎪
            </motion.span>
          ) : (
            <motion.span key="off" style={{ opacity: 0 }} />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ON label — left side, slides in from left when ON */}
      <motion.div
        className="absolute flex flex-col items-center justify-center overflow-hidden"
        style={{ left: TEXT_PAD, top: 0, bottom: 0, width: TEXT_W - TEXT_PAD + PAD, pointerEvents: 'none' }}
        animate={{ opacity: on ? 1 : 0, x: on ? 0 : -10 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      >
        <span style={{ fontFamily: BETHANY, fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.15 }}>
          Cost to Make
        </span>
        <span style={{ fontFamily: BETHANY, fontSize: 21, color: '#fff', lineHeight: 1.1 }}>
          ON
        </span>
      </motion.div>

      {/* OFF label — right side, slides in from right when OFF */}
      <motion.div
        className="absolute flex flex-col items-center justify-center overflow-hidden"
        style={{ right: TEXT_PAD, top: 0, bottom: 0, width: TEXT_W - TEXT_PAD + PAD, pointerEvents: 'none' }}
        animate={{ opacity: on ? 0 : 1, x: on ? 10 : 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      >
        <span style={{ fontFamily: BETHANY, fontSize: 12, color: 'rgba(80,80,80,0.7)', lineHeight: 1.15 }}>
          Cost to Make
        </span>
        <span style={{ fontFamily: BETHANY, fontSize: 21, color: '#666', lineHeight: 1.1 }}>
          OFF
        </span>
      </motion.div>
    </motion.button>
  )
}

/* ─── Main section ─── */
export default function Section2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const words = el.querySelectorAll<HTMLElement>('.word')
    const ctx = gsap.context(() => {
      words.forEach((word) => {
        gsap.fromTo(
          word,
          { opacity: 0, filter: 'blur(8px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: word,
              start: 'top 88%',
              end: 'top 72%',
              scrub: true,
            },
          }
        )
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-white relative z-[1]">
      <div ref={containerRef} className={`px-6 pt-32 pb-20 md:px-14 md:pt-40 md:pb-32 w-full mx-auto ${CONTENT_MAX_W}`}>

        {/* Headings — always visible */}
        <p className="font-heading text-[clamp(26px,4.5vw,44px)] font-normal leading-tight text-[#555555] mt-5 mb-2">
          <W>Most sales cut prices,</W>
        </p>
        <p className="font-heading text-[clamp(32px,6vw,62px)] font-normal leading-[1.05] text-[#111111] mb-10">
          <W>We cut the markup</W>
        </p>

        {/* Always-visible body copy */}
        <p className="font-body text-[clamp(16px,1.8vw,20px)] leading-[1.7] text-[#555555] my-5">
          <W>Last year, VIRGIO launched India's first Cost-to-Make Fashion Fair. No margins. No mark-ups. Just the truth behind the price.</W>
          <br />
        </p>
        <p className="font-body text-[clamp(16px,1.8vw,20px)] leading-[1.7] text-[#555555] my-5">

          <W>The response was overwhelming. So we're bringing it back.</W>
        </p>
        <p className="font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111]">
          <W>For five days, VIRGIO removes retail margins and sells on Cost-to-Make.</W>
        </p>

        <ProductShelf />

        {/* Toggle — scroll-revealed with the same blur effect as the words */}
        <span className="word inline-block mt-6 mb-1">
          <CostToMakeToggle on={open} onToggle={() => setOpen(v => !v)} />
        </span>

        {/* Collapsible: "You'll see exactly..." onward */}
        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0 }}
          style={{ overflow: 'hidden' }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: open ? 1 : 0,
              filter: open ? 'blur(0px)' : 'blur(10px)',
              y: open ? 0 : -14,
            }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1],
              delay: open ? 0.07 : 0,
            }}
          >
            <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] my-5">
              You&apos;ll see exactly what it takes to create your clothes and <span className="font-sub italic">you&apos;ll pay only for that.</span>
            </p>
            <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] my-5">
              That&apos;s Fabric. Labour. Packaging. Logistics.
            </p>
            <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] mb-10">
              The rest is on us.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA — always visible, shifts naturally */}
        <p className="font-heading text-[clamp(22px,3.5vw,36px)] font-normal leading-tight text-[#111111] mt-10 mb-5">
          <W>Shop before everyone else with Early Access</W>
        </p>

        <span className="word inline-block">
          <a
            href="#footer-countdown"
            className="inline-block bg-[#0D0D0D] text-white rounded-full px-8 py-3 text-[14px] font-medium font-sans transition-opacity hover:opacity-80 active:scale-[0.97]"
          >
            Get early access
          </a>
        </span>

      </div>
    </section>
  )
}
