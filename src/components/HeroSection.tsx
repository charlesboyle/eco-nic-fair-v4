'use client'

import Image from 'next/image'
import Stack from '@/components/Stack'
import GarlandBunting from '@/components/GarlandBunting'
import { CONTENT_MAX_W } from '@/lib/config'

const sizes = "(max-width: 640px) 100vw, 300px"

const cards = [
  <div key="hero" className="relative w-full h-full">
    <Image src="/assets/photo-hero.png" alt="Éco-nic Fair" fill sizes={sizes} className="object-cover pointer-events-none" />
  </div>,
  <div key="editorial" className="relative w-full h-full">
    <Image src="/assets/photo-editorial.jpg" alt="Editorial" fill sizes={sizes} className="object-cover pointer-events-none" />
  </div>,
  <div key="energy" className="relative w-full h-full">
    <Image src="/assets/photo-energy.jpg" alt="Energy" fill sizes={sizes} className="object-cover pointer-events-none" />
  </div>,
  <div key="narrative" className="relative w-full h-full">
    <Image src="/assets/photo-narrative.jpg" alt="Narrative" fill sizes={sizes} className="object-cover pointer-events-none" />
  </div>,
]

export default function HeroSection() {
  return (
    <section
      className="relative text-center"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #F4EFE9 100%)' }}
    >
      {/* Logo sits above the garland in z-order */}
      <div className="relative z-20 flex justify-center pt-5 pb-1">
        <Image
          src="/assets/eco-nic-logo.svg"
          alt="Éco-nic"
          width={200}
          height={200}
          style={{ width: 200, height: 'auto' }}
          priority
        />
      </div>

      <GarlandBunting />

      <div className={`flex flex-col items-center px-6 pt-6 pb-12 md:pt-8 md:pb-16 w-full mx-auto ${CONTENT_MAX_W}`}>
        {/* Heading */}
        <h1
          className="font-heading text-[#111111] leading-[1.04] mt-0 w-full text-balance"
          style={{ fontSize: 'clamp(30px, 6vw, 52px)' }}
        >
          India's first Cost to Make fair is back bigger <span className="whitespace-nowrap">than ever</span>
        </h1>

        {/* Stack carousel with CTA overlaid at bottom */}
        <div className="relative mt-5 mb-8" style={{ width: '260px', height: '300px' }}>
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
              className="bg-[#0D0D0D] text-white rounded-full px-8 py-3 text-[14px] font-medium font-sans transition-opacity hover:opacity-80 active:scale-[0.97] shadow-lg"
            >
              Get early access
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
