'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Masonry from '@/components/Masonry'

const BETHANY = "'BethanyElingston', Georgia, serif"
const HN = '"Helvetica Neue", Helvetica, Arial, sans-serif'
const ORANGE = '#F18C22'

// height = displayed_px * 2; displayed_px ≈ col_width * (img_h / img_w)
const ITEMS = [
  { id: '2',  img: '/assets/last-year/ly-2.jpg?v=3',  url: '', height: 356  }, // 1200×738  landscape
  { id: '3',  img: '/assets/last-year/ly-3.png?v=3',  url: '', height: 496  }, // 1024×878  ~square
  { id: '5',  img: '/assets/last-year/ly-5.png?v=3',  url: '', height: 516  }, // 880×784   ~square
  { id: '6',  img: '/assets/last-year/ly-6.png?v=3',  url: '', height: 634  }, // 1008×1106 portrait
  { id: '7',  img: '/assets/last-year/ly-7.png?v=3',  url: '', height: 656  }, // 1016×1152 portrait
  { id: '8',  img: '/assets/last-year/ly-8.png?v=3',  url: '', height: 1004 }, // 1028×1786 tall
  { id: '9',  img: '/assets/last-year/ly-9.png?v=3',  url: '', height: 308  }, // 858×457   landscape
]

/* ─── Look Back toggle — mirrors CostToMakeToggle, orange on-state ─── */
function LookBackToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
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
          backgroundColor: ORANGE,
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
          border: `1.5px solid ${on ? '#F5A84C' : '#C0C0C0'}`,
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
              📸
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
          Look Back
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
          Look Back
        </span>
        <span style={{ fontFamily: BETHANY, fontSize: 21, color: '#666', lineHeight: 1.1 }}>
          OFF
        </span>
      </motion.div>
    </motion.button>
  )
}

export default function MemoriesSection() {
  const [on, setOn] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [containerHeight, setContainerHeight] = useState(1380)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1500) setContainerHeight(740)
      else if (w >= 1000) setContainerHeight(810)
      else if (w >= 600) setContainerHeight(830)
      else if (w >= 400) setContainerHeight(1160)
      else setContainerHeight(2120)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #F4EFE9 100%)',
        paddingTop: '4rem',
        paddingBottom: '5rem',
      }}
    >
      {/* Heading */}
      <div className="px-6 md:px-14 mb-6 text-center">
        <p className="font-heading text-[clamp(22px,3.5vw,36px)] font-normal leading-tight text-[#888] mb-1">
          A look back
        </p>
        <h2 className="font-heading text-[clamp(32px,5vw,56px)] font-normal leading-[1.05] text-[#111]">
          Eco-nic Fair 2025
        </h2>
      </div>

      {/* Toggle — sticky while scrolling through masonry */}
      <div
        style={{
          position: 'sticky',
          top: 20,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'center',
          padding: '10px 0 14px',
        }}
      >
        <LookBackToggle on={on} onToggle={() => {
          const turningOff = on
          setOn(v => !v)
          setExpanded(false)
          if (turningOff) {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }} />
      </div>

      {/* Masonry grid — collapses when toggle is OFF */}
      <motion.div
        initial={false}
        animate={{ height: on ? containerHeight : 0 }}
        style={{ overflow: expanded ? 'visible' : 'hidden' }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        onAnimationComplete={() => setExpanded(on)}
      >
        <motion.div
          initial={false}
          animate={{
            opacity: on ? 1 : 0,
            filter: on ? 'blur(0px)' : 'blur(10px)',
            y: on ? 0 : -14,
          }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: on ? 0.07 : 0 }}
        >
          <div
            className="px-4 md:px-14 mx-auto pb-20 md:pb-10"
            style={{ maxWidth: 900, height: containerHeight }}
          >
            <Masonry
              items={ITEMS}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={1.03}
              blurToFocus
              stagger={0.04}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
