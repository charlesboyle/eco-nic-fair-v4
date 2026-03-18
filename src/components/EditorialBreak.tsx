'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function EditorialBreak() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} style={{ position: 'relative', height: '62vh', overflow: 'hidden' }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: '-15%',
          backgroundImage: 'url(/assets/editorial-break.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y,
        }}
      />
    </section>
  )
}
