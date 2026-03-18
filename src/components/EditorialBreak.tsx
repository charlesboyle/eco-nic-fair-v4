'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function EditorialBreak() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <section ref={ref} style={{ position: 'relative', height: '46vh', overflow: 'hidden' }}>
      <motion.div
        style={{
          position: 'absolute',
          inset: '-15%',
          backgroundImage: 'url(/assets/vir-eco.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'center center' : 'center 30%',
          y,
        }}
      />
    </section>
  )
}
