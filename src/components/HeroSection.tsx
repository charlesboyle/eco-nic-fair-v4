'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import Stack from '@/components/Stack'
import GarlandBunting from '@/components/GarlandBunting'
import { CONTENT_MAX_W } from '@/lib/config'

const sizes = "(max-width: 640px) 100vw, 300px"
const HN = '"Helvetica Neue", Helvetica, Arial, sans-serif'

function PriceTag({ name, ctm }: { name: string; ctm: string }) {
  return (
    <div style={{
      position: 'absolute', bottom: 10, left: 10, zIndex: 10,
      display: 'flex', alignItems: 'center', gap: 6,
      backgroundColor: 'rgba(0,0,0,0.52)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderRadius: 100,
      padding: '5px 10px 5px 8px',
      pointerEvents: 'none',
    }}>
      <span style={{ fontFamily: HN, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.78)' }}>{name}</span>
      <span style={{ fontFamily: HN, fontSize: 11, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.2px' }}>{ctm}</span>
    </div>
  )
}

const cards = [
  <div key="hero" className="relative w-full h-full">
    <Image src="/assets/photo-hero.png" alt="Hande" fill sizes={sizes} className="object-cover pointer-events-none" />
    <PriceTag name="Hande" ctm="₹1,163" />
  </div>,
  <div key="editorial" className="relative w-full h-full">
    <Image src="/assets/photo-editorial.jpg" alt="Birce" fill sizes={sizes} className="object-cover pointer-events-none" />
    <PriceTag name="Birce" ctm="₹1,085" />
  </div>,
  <div key="energy" className="relative w-full h-full">
    <Image src="/assets/photo-energy.jpg" alt="Rodel" fill sizes={sizes} className="object-cover pointer-events-none" />
    <PriceTag name="Rodel" ctm="₹1,163" />
  </div>,
  <div key="narrative" className="relative w-full h-full">
    <Image src="/assets/photo-narrative.jpg" alt="Éco-nic Fair" fill sizes={sizes} className="object-cover pointer-events-none" />
  </div>,
]

export default function HeroSection() {
  return (
    <section
      className="relative text-center"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #F4EFE9 100%)' }}
    >
      {/* Logo container with adaptive white background */}
      <div className="relative z-20 flex justify-center mb-4">
        {/* The White Background Capsule */}
        <motion.div
          className="absolute top-0 w-[148px] md:w-[196px] h-full bg-white rounded-b-[16px] z-10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.10)]"
          initial={{ opacity: 0, scaleY: 0.8 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'top' }}
        />

        {/* The Logo itself */}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <GarlandBunting />
      </motion.div>

      <div className={`flex flex-col items-center px-6 pt-3 pb-0 md:pt-4 w-full mx-auto ${CONTENT_MAX_W}`}>

        {/* Heading first */}
        <motion.h1
          className="font-heading text-[#111111] leading-[1.1] mt-2 mb-6 w-full"
          style={{ fontSize: 'clamp(30px, 6vw, 52px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          India&apos;s first <span className="whitespace-nowrap">Cost-to-Make</span> <span className="whitespace-nowrap">Fair is back</span>
          <br />
          <span className="font-heading" style={{ fontSize: 'clamp(18px, 3.2vw, 30px)', opacity: 0.45 }}>AND IT&apos;S BIGGER THAN EVER</span>
        </motion.h1>

        {/* Stack carousel — bleeds into Section2 */}
        <motion.div
          className="relative z-10"
          style={{ width: '260px', height: '300px', marginBottom: '-90px' }}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Stack
            cards={cards}
            autoplay
            autoplayDelay={2800}
            pauseOnHover
            sendToBackOnClick
            animationConfig={{ stiffness: 200, damping: 24 }}
            sensitivity={160}
          />
          {/* CTA overlaid on bottom of stack */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
            <a
              href="#footer-countdown"
              className="bg-[#0D0D0D] text-white rounded-full px-8 py-3 text-[14px] font-medium font-sans transition-colors duration-300 hover:bg-[#3a3a3a] active:scale-[0.97] shadow-lg"
            >
              Get early access
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
