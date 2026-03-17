'use client'

import Image from 'next/image'
import SpotlightCard from '@/components/SpotlightCard'
import { CONTENT_MAX_W } from '@/lib/config'

const cards = [
  {
    image: '/assets/photo-hero.png',
    title: 'Visit VIRGIO Stores',
    description:
      "If you're near one of our stores, step in for more than just the prices. Expect music, memories, and a little anniversary madness at all our stores.",
    cta: 'Get directions',
  },
  {
    image: '/assets/photo-editorial.jpg',
    title: 'Shop our curve edit',
    description:
      "Beyond The Curve, our brand celebrating curvy women is joining the celebrations too! Shop fearless fits at some really fair prices.",
    cta: 'Shop now',
  },
  {
    image: '/assets/photo-energy.jpg',
    title: 'Shop AMODIRA',
    description:
      "For the ones who love a touch of luxury discover AMODIRA, our range of perfumes inspired by Indian royalty for men and women.",
    cta: 'Shop now',
  },
]

export default function Section3() {
  return (
    <section className="bg-white py-16 md:py-24">
      {/* Title */}
      <div className="px-6 md:px-14 mb-10 w-full mx-auto max-w-5xl md:text-center">
        <p className="font-heading text-[clamp(26px,4.5vw,44px)] font-normal leading-tight text-[#555555] mb-2">
          It's going to be
        </p>
        <h2 className="font-heading text-[clamp(32px,6vw,62px)] font-normal leading-[1.05] text-[#111111]">
          A fair to remember
        </h2>
      </div>

      {/* Mobile: horizontal scroll */}
      <div
        className="flex md:hidden gap-4 overflow-x-auto pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: 'max(1.5rem, calc((100vw - 42rem) / 2 + 3.5rem))',
          paddingRight: 'max(1.5rem, calc((100vw - 42rem) / 2 + 3.5rem))',
          scrollPaddingLeft: 'max(1.5rem, calc((100vw - 42rem) / 2 + 3.5rem))',
        }}
      >
        {cards.map((card) => (
          <SpotlightCard
            key={card.title}
            className="flex-shrink-0 w-[280px] flex flex-col !p-0 overflow-hidden"
            style={{ scrollSnapAlign: 'start' } as React.CSSProperties}
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image src={card.image} alt={card.title} fill sizes="280px" className="object-cover" />
            </div>
            <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-2">
              <h3 className="font-heading text-white text-[1.1rem] leading-tight">{card.title}</h3>
              <p className="font-body text-neutral-400 text-[0.85rem] leading-snug flex-1">{card.description}</p>
              <button className="mt-1 self-start bg-white text-neutral-900 rounded-full px-4 py-1.5 text-[12px] font-medium transition-opacity hover:opacity-80 active:scale-[0.97]">{card.cta}</button>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Desktop: centered grid filling page margins */}
      <div className="hidden md:flex gap-4 px-14 mx-auto max-w-5xl">
        {cards.map((card) => (
          <SpotlightCard
            key={card.title}
            className="flex-1 flex flex-col !p-0 overflow-hidden"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image src={card.image} alt={card.title} fill sizes="400px" className="object-cover" />
            </div>
            <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-2">
              <h3 className="font-heading text-white text-[1.1rem] leading-tight">{card.title}</h3>
              <p className="font-body text-neutral-400 text-[0.85rem] leading-snug flex-1">{card.description}</p>
              <button className="mt-1 self-start bg-white text-neutral-900 rounded-full px-4 py-1.5 text-[12px] font-medium transition-opacity hover:opacity-80 active:scale-[0.97]">{card.cta}</button>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
