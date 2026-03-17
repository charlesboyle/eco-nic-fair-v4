'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CurvedLoop from '@/components/CurvedLoop'
import { CONTENT_MAX_W } from '@/lib/config'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE = 'STARTS MAR 27 \u25C6 ZERO MARKUPS \u25C6 PAY ONLY COST TO MAKE \u25C6 '

// Regular words for animation
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

// Playfair italic words for animation
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

export default function Section2() {
  const containerRef = useRef<HTMLDivElement>(null)

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
      {/* z-[1] ensures the CurvedLoop SVG overflow paints above the hero section background */}
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

        <p className="font-heading text-[clamp(26px,4.5vw,44px)] font-normal leading-tight text-[#555555] mt-5 mb-2">
          <W>Most sales cut prices,</W>
        </p>

        <p className="font-heading text-[clamp(32px,6vw,62px)] font-normal leading-[1.05] text-[#111111] mb-10">
          <W>We cut the markup</W>
        </p>

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
        <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] my-5">
          <W>You'll see exactly what it takes to create your clothes and</W>{' '}<WI>you'll pay only for that.</WI>
        </p>
        <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] my-5">
          <W>That's Fabric. Labour. Packaging. Logistics.</W>
        </p>
        <p className="font-body font-medium text-[clamp(20px,3vw,28px)] leading-[1.55] text-[#111111] my-5">
          <W>The rest is on us.</W>
        </p>

        <p className="font-heading text-[clamp(22px,3.5vw,36px)] font-normal leading-tight text-[#111111] mt-10 mb-5">
          Shop before everyone else with Early Access
        </p>

        <a
          href="#footer-countdown"
          className="inline-block bg-[#0D0D0D] text-white rounded-full px-8 py-3 text-[14px] font-medium font-sans transition-opacity hover:opacity-80 active:scale-[0.97]"
        >
          Get early access
        </a>

      </div>
    </section>
  )
}
