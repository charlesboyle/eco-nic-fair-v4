'use client'

import { useRef, useEffect, useState, createContext, useContext, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Stack from '@/components/Stack'
import { CONTENT_MAX_W } from '@/lib/config'

gsap.registerPlugin(ScrollTrigger)

const BETHANY = "'BethanyElingston', Georgia, serif"
const HN = '"Helvetica Neue", Helvetica, Arial, sans-serif'

const sizes = '(max-width: 640px) 80vw, 300px'

/* ─── Stack cards for Section 2 ─── */
const STACK_CARDS_DATA = [
  { src: '/assets/VIRGIO 7.jpeg',       name: 'Kyla',  retail: 1390, ctm: 684  },
  { src: '/assets/photo-narrative.jpg', name: 'Ceyda', retail: 1990, ctm: 1116 },
  { src: '/assets/VIRGIO 5.jpeg',       name: 'Olmia', retail: 1590, ctm: 922  },
]

const ToggleContext = createContext(false)

function StackCard({ data }: { data: typeof STACK_CARDS_DATA[0] }) {
  const open = useContext(ToggleContext)
  return (
    <div className="relative w-full h-full">
      <Image
        src={data.src}
        alt={data.name}
        fill
        sizes={sizes}
        className="object-cover object-top pointer-events-none"
      />
      {/* Pill lives on the card — stays in sync with toggle via context */}
      <div
        className="absolute left-0 right-0 flex justify-center"
        style={{ bottom: 38, pointerEvents: 'none', zIndex: 10 }}
      >
        <motion.div
          style={{
            borderRadius: 100,
            padding: '5px 14px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            width: 132,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          animate={{
            backgroundColor: open ? 'rgba(0,0,0,0.92)' : 'rgba(0,0,0,0.56)',
            boxShadow: open
              ? 'inset 0 0 0 2px rgba(80,200,110,0.82)'
              : 'inset 0 0 0 0.5px rgba(255,255,255,0.22)',
          }}
          transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        >
          <span style={{ fontFamily: HN, fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {data.name}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'ctm' : 'retail'}
              style={{ fontFamily: HN, fontSize: 13, fontWeight: 700, color: open ? '#7de8a0' : '#fff', letterSpacing: '-0.2px' }}
              initial={{ opacity: 0, y: 4, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -4, filter: 'blur(3px)' }}
              transition={{ duration: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
            >
              ₹{(open ? data.ctm : data.retail).toLocaleString('en-IN')}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>
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

/* ─── Big pill toggle — Bethany font only ─── */
function CostToMakeToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const H = 60, PAD = 6, KNOB = H - PAD * 2
  const GAP = 12
  const TEXT_PAD = 12
  const TEXT_W = 90
  const W_PX = PAD + TEXT_W + GAP + KNOB + PAD

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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 60,
          border: `1.5px solid ${on ? '#48BE80' : '#C0C0C0'}`,
          mixBlendMode: 'multiply',
          transition: 'border-color 0.35s ease',
        }}
      />

      {/* Knob */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full bg-white overflow-hidden"
        style={{ width: KNOB, height: KNOB, top: PAD, boxShadow: '0 2px 8px rgba(0,0,0,0.22)', fontSize: KNOB * 0.55 }}
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

      {/* ON label */}
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

      {/* OFF label */}
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

  /* Stable card array — memoized with no deps so stack order is never reset */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stackCards = useMemo(() => STACK_CARDS_DATA.map((c, i) => <StackCard key={i} data={c} />), [])

  return (
    <section className="bg-white relative z-[1]">
      <div
        ref={containerRef}
        className={`px-8 pt-10 pb-20 md:px-24 md:pt-14 md:pb-32 w-full mx-auto flex flex-col items-center text-center ${CONTENT_MAX_W}`}
      >

        {/* Headings */}
        <p className="font-heading text-[clamp(26px,4.5vw,44px)] font-normal leading-tight text-[#555555] mt-4 mb-2">
          <W>Most sales cut prices,</W>
        </p>
        <p className="font-heading text-[clamp(32px,6vw,62px)] font-normal leading-[1.05] text-[#111111] mb-8">
          <W>We cut the markup</W>
        </p>

        {/* Body copy — consistent mb-5 spacing throughout */}
        <p className="font-body text-[clamp(16px,1.8vw,20px)] leading-[1.5] text-[#555555] mb-5 max-w-2xl">
          <W>Last year, we took a massive bet, something most fashion brands would run from. We launched India&apos;s first Cost-to-Make Fashion Fair. No margins. No mark-ups.</W>
        </p>
        <p className="font-body text-[clamp(16px,1.8vw,20px)] leading-[1.5] text-[#555555] mb-5 max-w-2xl">
          <W>The response was overwhelming. So we&apos;re bringing it back.</W>
        </p>
        <p className="font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] mb-0 max-w-2xl">
          <W>For five days, we remove all margins and sell at Cost-to-Make</W>
        </p>

        {/* Stack + Toggle — single scroll-reveal block */}
        <div className="word mt-10 mb-0 flex flex-col items-center">
          <div style={{ width: 260, height: 320, position: 'relative' }}>
            <ToggleContext.Provider value={open}>
              <Stack
                cards={stackCards}
                autoplay
                autoplayDelay={2800}
                sendToBackOnClick
                animationConfig={{ stiffness: 200, damping: 24 }}
                sensitivity={160}
              />
            </ToggleContext.Provider>
          </div>

          {/* Toggle — bleeds into bottom of stack */}
          <div style={{ marginTop: -28, position: 'relative', zIndex: 10 }}>
            <CostToMakeToggle on={open} onToggle={() => setOpen(v => !v)} />
          </div>
        </div>

        {/* Collapsible reveal */}
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
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: open ? 0.07 : 0 }}
          >
            <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] my-5 max-w-2xl">
              You&apos;ll see exactly what it takes to create your clothes and <span className="font-sub italic">you&apos;ll pay only for that.</span>
            </p>
            <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] my-5 max-w-2xl">
              That&apos;s Fabric. Labour. Packaging. Logistics.
            </p>
            <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] mb-10 max-w-2xl">
              The rest is on us.
            </p>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <p className="font-heading text-[clamp(22px,3.5vw,36px)] font-normal leading-tight text-[#111111] mt-10 mb-5">
          <W>Shop before everyone else with Early Access</W>
        </p>

        <span className="word inline-block">
          <a
            href="#footer-countdown"
            className="inline-block bg-[#0D0D0D] text-white rounded-full px-8 py-3 text-[14px] font-medium font-sans transition-opacity duration-300 hover:opacity-75 active:scale-[0.97]"
          >
            Get early access
          </a>
        </span>

      </div>
    </section>
  )
}
