'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'

// March 27, 2026 — 12:00am IST = March 26, 2026 18:30:00 UTC
const SALE_UTC = Date.UTC(2026, 2, 26, 18, 30, 0)

function getTimeLeft() {
  const diff = Math.max(0, SALE_UTC - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative overflow-hidden tabular-nums font-heading text-[#111111] leading-none"
        style={{ fontSize: 'clamp(52px, 13vw, 112px)', height: 'clamp(56px, 14vw, 120px)', minWidth: 'clamp(60px, 13vw, 120px)' }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: '80%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-80%', opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-body text-[#999] text-[10px] uppercase tracking-[0.18em] mt-2">{label}</span>
    </div>
  )
}

export default function FooterCountdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer id="footer-countdown" className="relative" style={{ background: '#F4EFE9' }}>

      {/* Ghost watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-8 -right-8 font-heading leading-none opacity-[0.04] text-[#111] overflow-hidden"
        style={{ fontSize: 'clamp(120px, 28vw, 240px)', whiteSpace: 'nowrap' }}
      >
        Fair
      </span>

      {/* Amber top accent line */}
      <div className="w-full h-[3px]" style={{ background: '#F18C22' }} />

      <div className="relative z-10 px-6 md:px-14 pt-14 pb-10 md:pt-20 md:pb-14 flex flex-col items-center text-center">

        {/* Heading */}
        <p className="font-heading text-[clamp(22px,4vw,36px)] font-normal leading-tight text-[#555] mb-6">
          The fair begins in
        </p>

        {/* Countdown — amber colons per design guidelines */}
        <div className="flex items-end gap-2 md:gap-4 mb-4">
          <CountdownUnit value={time.days} label="Days" />
          <span className="font-heading pb-7 md:pb-10 leading-none" style={{ fontSize: 'clamp(28px,6vw,56px)', color: '#F18C22' }}>:</span>
          <CountdownUnit value={time.hours} label="Hours" />
          <span className="font-heading pb-7 md:pb-10 leading-none" style={{ fontSize: 'clamp(28px,6vw,56px)', color: '#F18C22' }}>:</span>
          <CountdownUnit value={time.minutes} label="Mins" />
          <span className="font-heading pb-7 md:pb-10 leading-none" style={{ fontSize: 'clamp(28px,6vw,56px)', color: '#F18C22' }}>:</span>
          <CountdownUnit value={time.seconds} label="Secs" />
        </div>

        <p className="font-body text-[#888] text-[0.8rem] mb-10 tracking-wide">
          27 March 2026 · 12:00 am IST
        </p>

        {/* Early access card — green fill */}
        <div className="rounded-2xl p-5 md:p-6 mb-12 w-full max-w-md"
          style={{ background: '#009245' }}>
          <div className="flex flex-col items-center gap-1 mb-5">
            <p className="font-body font-semibold text-white text-[1rem] leading-snug">
              Early access starts 4 hours earlier
            </p>
            <p className="font-body text-[rgba(255,255,255,0.75)] text-[0.85rem] leading-snug">
              for app users and community members
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <button className="bg-white text-[#009245] rounded-full px-7 py-3 text-[14px] font-medium font-sans transition-opacity hover:opacity-90 active:scale-[0.97]">
              Download the app
            </button>
            <button className="bg-transparent text-white rounded-full px-7 py-3 text-[14px] font-medium font-sans hover:opacity-70 active:scale-[0.97] transition-opacity"
              style={{ border: '1.5px solid rgba(255,255,255,0.5)' }}>
              Join the community
            </button>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="flex items-center justify-center gap-3 pt-8 w-full" style={{ borderTop: '1px solid rgba(0,0,0,0.10)' }}>
          <Image
            src="/assets/eco-nic-logo.svg"
            alt="Éco-nic"
            width={28}
            height={28}
            style={{ width: 28, height: 'auto', opacity: 0.5 }}
          />
          <p className="font-body text-[#999] text-[13px]">
            © 2026 VIRGIO. Where fashion comes full circle.
          </p>
        </div>

      </div>
    </footer>
  )
}
