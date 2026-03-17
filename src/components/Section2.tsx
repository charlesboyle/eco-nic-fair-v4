'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CurvedLoop from '@/components/CurvedLoop'
import { CONTENT_MAX_W } from '@/lib/config'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE = 'STARTS MAR 27 \u25C6 ZERO MARKUPS \u25C6 PAY ONLY COST TO MAKE \u25C6 '
const GREEN = '#2B6E3A'
const BETHANY = "'BethanyElingston', Georgia, serif"

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
  const W_PX = 220, H = 66, PAD = 8, KNOB = H - PAD * 2 // knob = 50px
  // Text area: fill from pill edge to just before knob with minimal gap
  const textW = W_PX - KNOB - PAD * 2 - 2

  return (
    <motion.button
      onClick={onToggle}
      className="relative flex-shrink-0 focus:outline-none cursor-pointer"
      style={{ width: W_PX, height: H, borderRadius: H / 2, border: 'none', background: 'transparent', padding: 0 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
    >
      {/* Background pill */}
      <motion.div
        className="absolute inset-0"
        style={{ borderRadius: H / 2 }}
        animate={{ backgroundColor: on ? GREEN : '#C7C7CC' }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Knob */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full bg-white shadow-md overflow-hidden"
        style={{ width: KNOB, height: KNOB, top: PAD, fontSize: KNOB * 0.52 }}
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

      {/* ON label — left of knob, Bethany only */}
      <motion.div
        className="absolute flex flex-col items-start justify-center"
        style={{ left: PAD, top: 0, bottom: 0, width: textW, pointerEvents: 'none' }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <span style={{ fontFamily: BETHANY, fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.1 }}>
          Cost to Make
        </span>
        <span style={{ fontFamily: BETHANY, fontSize: 22, color: '#fff', lineHeight: 1.1 }}>
          ON
        </span>
      </motion.div>

      {/* OFF label — right of knob, Bethany only */}
      <motion.div
        className="absolute flex flex-col items-end justify-center"
        style={{ right: PAD, top: 0, bottom: 0, width: textW, pointerEvents: 'none' }}
        animate={{ opacity: on ? 0 : 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <span style={{ fontFamily: BETHANY, fontSize: 13, color: 'rgba(80,80,80,0.7)', lineHeight: 1.1 }}>
          Cost to Make
        </span>
        <span style={{ fontFamily: BETHANY, fontSize: 22, color: '#555', lineHeight: 1.1 }}>
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
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <CurvedLoop
          marqueeText={MARQUEE}
          speed={1.2}
          curveAmount={9}
          interactive={false}
          className="!fill-[#111111] text-[3rem] font-heading"
          bandFill="#ffffff"
          awningColor="#F18C22"
          awningStripeWidth={200}
          awningHeight={26}
          bandPaddingTop={130}
          bandPaddingBottom={40}
          bottomBorderColor="#F18C22"
          bottomBorderWidth={4}
        />
      </motion.div>

      <div ref={containerRef} className={`px-6 pt-14 pb-20 md:px-14 md:pt-20 md:pb-32 w-full mx-auto ${CONTENT_MAX_W}`}>

        {/* Headings — always visible */}
        <p className="font-heading text-[clamp(26px,4.5vw,44px)] font-normal leading-tight text-[#555555] mt-5 mb-2">
          <W>Most sales cut prices,</W>
        </p>
        <p className="font-heading text-[clamp(32px,6vw,62px)] font-normal leading-[1.05] text-[#111111] mb-10">
          <W>We cut the markup</W>
        </p>

        {/* Always-visible body copy */}
        <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] my-5">
          <W>Last year, VIRGIO launched India's first Cost to Make Fashion Fair.</W>
          <br />
          <W>No margins. No mark-ups. Just the</W>{' '}<WI>truth</WI>{' '}<W>behind the price.</W>
        </p>
        <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] my-5">
          <W>The response was overwhelming. So we're bringing it back.</W>
        </p>
        <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] my-5">
          <WI>For five days,</WI>{' '}<W>VIRGIO removes retail margins and sells on cost-to-make.</W>
        </p>

        {/* Toggle — sits right above "You'll see exactly" */}
        <motion.div
          className="my-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <CostToMakeToggle on={open} onToggle={() => setOpen(v => !v)} />
        </motion.div>

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
