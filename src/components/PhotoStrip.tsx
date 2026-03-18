'use client'

const STRIP_IMAGES = [
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=320&h=200&fit=crop&q=80',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=320&h=200&fit=crop&q=80',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=320&h=200&fit=crop&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=320&h=200&fit=crop&q=80',
  'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=320&h=200&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=320&h=200&fit=crop&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=320&h=200&fit=crop&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=320&h=200&fit=crop&q=80',
]

const ALL = [...STRIP_IMAGES, ...STRIP_IMAGES]

export default function PhotoStrip() {
  return (
    <div style={{ overflow: 'hidden', height: 160, position: 'relative' }}>
      <style>{`
        @keyframes photo-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .photo-strip-inner {
          display: flex;
          gap: 8px;
          width: max-content;
          animation: photo-marquee 32s linear infinite;
        }
        .photo-strip-inner:hover { animation-play-state: paused; }
      `}</style>
      <div className="photo-strip-inner">
        {ALL.map((src, i) => (
          <div key={i} style={{ width: 240, height: 160, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
