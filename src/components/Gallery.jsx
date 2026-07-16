import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import RevealText from './RevealText'

const modules = import.meta.glob('../assets/artwork/*.jpg', { eager: true, import: 'default' })
const artworks = Object.keys(modules)
  .sort()
  .map((k, i) => ({ src: modules[k], id: i }))

export default function Gallery() {
  const [active, setActive] = useState(null)
  const scrollerRef = useRef(null)

  const next = () => setActive((a) => (a === null ? 0 : (a + 1) % artworks.length))
  const prev = () => setActive((a) => (a === null ? 0 : (a - 1 + artworks.length) % artworks.length))

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[#14110d] overflow-hidden">
      <div className="px-6 md:px-16 mb-12">
        <p className="text-[color:var(--gold-soft)] text-sm sm:text-base tracking-[0.4em] uppercase mb-4">Her Artwork</p>
        <h2 className="font-display italic text-white text-5xl sm:text-6xl md:text-7xl leading-none">
          <RevealText>Some of her finest creations</RevealText>
        </h2>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-5 md:gap-8 overflow-x-auto px-6 md:px-16 pb-6 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'thin' }}
      >
        {artworks.map((art, i) => (
          <motion.button
            key={art.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActive(i)}
            className="relative flex-shrink-0 w-[220px] sm:w-[280px] md:w-[320px] h-[300px] sm:h-[380px] md:h-[420px] snap-start group overflow-hidden rounded-sm"
            style={{ boxShadow: '0 20px 50px -15px rgba(0,0,0,0.6)' }}
          >
            <img
              src={art.src}
              alt={`Artwork ${i + 1} by Prerna`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
              <span className="text-white text-xs tracking-[0.2em] uppercase">
                No. {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 sm:left-8 text-white/60 hover:text-white transition-colors"
              aria-label="Previous artwork"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 sm:right-8 text-white/60 hover:text-white transition-colors"
              aria-label="Next artwork"
            >
              <ChevronRight size={32} />
            </button>

            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={artworks[active].src}
              alt={`Artwork ${active + 1} by Prerna, enlarged`}
              className="max-h-[85vh] max-w-[92vw] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.2em] uppercase">
              No. {String(active + 1).padStart(2, '0')} — of {artworks.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
