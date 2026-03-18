'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import GarlandBunting from '@/components/GarlandBunting'

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden md:flex md:flex-row md:items-stretch"
      style={{ background: '#F4EFE9', minHeight: '78vh' }}
    >

      {/* ── LEFT column — logo, garland, heading, CTA ── */}
      <div className="relative z-[1] w-full md:w-1/2 flex flex-col text-center">

        {/* Logo capsule */}
        <div className="relative flex justify-center">
          <motion.div
            className="absolute top-0 w-[148px] md:w-[196px] h-full bg-white rounded-b-[16px] z-10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.10)]"
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
          />
          <motion.div
            className="relative z-20 pt-4 pb-4 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src="/assets/eco-nic-logo.svg"
              alt="Éco-nic"
              width={170}
              height={200}
              className="w-[126px] md:w-[170px]"
              style={{ height: 'auto' }}
              priority
            />
          </motion.div>
        </div>

        {/* Garland — positioned relative to left column */}
        <motion.div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{ zIndex: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <GarlandBunting />
        </motion.div>

        {/* Heading + desktop CTA */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-6 pb-8 md:pb-20">
          <motion.h1
            className="font-heading text-[#111111] leading-[1.1] mb-6 w-full"
            style={{ fontSize: 'clamp(42px, 5vw, 58px)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            India&apos;s first <span className="whitespace-nowrap">Cost-to-Make</span>{' '}
            <span className="whitespace-nowrap">Fair is back</span>
          </motion.h1>

          {/* CTA — desktop only; mobile version pinned to section bottom */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <a
              href="#footer-countdown"
              className="inline-block bg-[#0D0D0D] text-white rounded-full px-8 py-3 text-[14px] font-medium font-sans transition-opacity duration-300 hover:opacity-75 active:scale-[0.97] shadow-lg"
            >
              Get early access
            </a>
          </motion.div>
        </div>


      </div>

      {/* ── RIGHT column — image, desktop only ── */}
      <motion.div
        className="hidden md:block md:w-1/2 relative"
        style={{ minHeight: '78vh' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src="/assets/fair-hero.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
        {/* Left-edge blend — soft, wide fade into content column */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #F4EFE9 0%, rgba(244,239,233,0.85) 12%, rgba(244,239,233,0.58) 28%, rgba(244,239,233,0.22) 50%, rgba(244,239,233,0.05) 68%, transparent 82%)',
          }}
        />
      </motion.div>

      {/* ── Mobile image — absolute bottom, 60vh ── */}
      <motion.div
        className="md:hidden absolute bottom-0 left-0 right-0"
        style={{ height: '60vh', zIndex: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src="/assets/fair-hero.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
        {/* Gradient — solid beige at top fading to transparent */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #F4EFE9 0%, rgba(244,239,233,0.88) 18%, rgba(244,239,233,0.55) 38%, rgba(244,239,233,0.18) 60%, transparent 82%)',
          }}
        />
      </motion.div>

      {/* ── Mobile CTA — pinned to section bottom ── */}
      <motion.div
        className="md:hidden absolute bottom-0 left-0 right-0 z-10 flex justify-center pb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <a
          href="#footer-countdown"
          className="inline-block bg-[#0D0D0D] text-white rounded-full px-8 py-3 text-[14px] font-medium font-sans transition-opacity duration-300 hover:opacity-75 active:scale-[0.97] shadow-lg"
        >
          Get early access
        </a>
      </motion.div>

    </section>
  )
}
