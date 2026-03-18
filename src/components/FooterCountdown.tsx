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
        style={{ fontSize: 'clamp(32px, 7vw, 66px)', height: 'clamp(36px, 8vw, 72px)', minWidth: 'clamp(36px, 7vw, 72px)' }}
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
      <span className="font-body text-[#999] text-[9px] uppercase tracking-[0.18em] mt-1.5">{label}</span>
    </div>
  )
}

export default function FooterCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setTime(getTimeLeft())
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer id="footer-countdown" className="relative" style={{ background: 'linear-gradient(180deg, #F4EFE9 0%, #ffffff 100%)' }}>

      {/* Amber top accent line */}
      <div className="w-full h-[3px]" style={{ background: '#F18C22' }} />

      <div className="relative z-10 px-6 md:px-14 pt-14 pb-10 md:pt-20 md:pb-14 flex flex-col items-center text-center">

        {/* Heading */}
        <p className="font-heading text-[clamp(22px,4vw,36px)] font-normal leading-tight text-[#555] mb-6">
          The fair begins in
        </p>

        {/* Countdown — amber colons per design guidelines */}
        <div className="flex items-end gap-1.5 md:gap-3 mb-4">
          <CountdownUnit value={time.days} label="Days" />
          <span className="font-heading pb-4 md:pb-5 leading-none" style={{ fontSize: 'clamp(18px,3.5vw,32px)', color: '#F18C22' }}>:</span>
          <CountdownUnit value={time.hours} label="Hours" />
          <span className="font-heading pb-4 md:pb-5 leading-none" style={{ fontSize: 'clamp(18px,3.5vw,32px)', color: '#F18C22' }}>:</span>
          <CountdownUnit value={time.minutes} label="Mins" />
          <span className="font-heading pb-4 md:pb-5 leading-none" style={{ fontSize: 'clamp(18px,3.5vw,32px)', color: '#F18C22' }}>:</span>
          <CountdownUnit value={time.seconds} label="Secs" />
        </div>

        <p className="font-heading font-normal text-[#555] mb-10" style={{ fontSize: 'clamp(16px,2.4vw,21px)', letterSpacing: '0.01em' }}>
          27 March 2026 &middot; 12:00 am IST
        </p>

        {/* Early access — ticket pass */}
        <div
          className="w-full max-w-sm mb-12 relative overflow-hidden"
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          {/* Top stripe bar — animated sliding */}
          <div style={{ height: '7px', overflow: 'hidden', borderRadius: '18px 18px 0 0', position: 'relative' }}>
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0, bottom: 0,
                left: '-40px',
                right: '-40px',
                backgroundImage: 'repeating-linear-gradient(to right, #009245 0px, #009245 20px, #ffffff 20px, #ffffff 40px)',
              }}
              animate={{ x: [0, 40] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
            />
          </div>

          {/* Blurred stripe glow at bottom — visual flair */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: 90,
              backgroundImage: 'repeating-linear-gradient(to right, #009245 0px, #009245 20px, #F18C22 20px, #F18C22 40px)',
              filter: 'blur(20px)',
              opacity: 0.065,
              maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* TOP STUB */}
          <div style={{ padding: '24px 24px 10px', position: 'relative', zIndex: 1 }}>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(20px, 5vw, 26px)',
              color: '#0D0D0D',
              lineHeight: 1.1,
              marginBottom: '10px',
              letterSpacing: '0em',
            }}>
              Early Access
            </p>
            <p style={{
              fontSize: '15px',
              color: 'rgba(0,0,0,0.48)',
              lineHeight: 1.4,
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontWeight: 400,
            }}>
              App users and community members get in 4 hours early before the fair opens to everyone
            </p>
          </div>

          {/* BOTTOM STUB */}
          <div style={{
            padding: '10px 24px 22px',
            display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '10px',
            position: 'relative', zIndex: 1,
          }}>
            <a
              href="https://chat.whatsapp.com/Kn5EnWx5WV5IFGMBYir7De"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity duration-300 hover:opacity-75 active:scale-[0.97]"
              style={{
                display: 'block', textAlign: 'center', textDecoration: 'none',
                background: '#0D0D0D',
                color: '#fff', borderRadius: '100px',
                padding: '13px 28px', fontSize: '14px', fontWeight: 500,
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                width: '100%', boxSizing: 'border-box',
              }}
            >
              Join community
            </a>
          </div>
        </div>

        {/* Footer logo only */}
        <div className="flex flex-col items-center justify-center pt-8 w-full">
          <Image
            src="/assets/eco-nic-logo.svg"
            alt="Éco-nic"
            width={72}
            height={72}
            style={{ width: 72, height: 'auto' }}
          />
        </div>

      </div>
    </footer>
  )
}
