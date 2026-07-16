import { motion } from 'framer-motion'
import RevealText from './RevealText'
import musicCollage from '../assets/music/music.jpg'

export default function Music() {
  return (
    <section className="relative min-h-[95vh] bg-[#161310] flex items-center overflow-hidden px-6 md:px-16 py-24">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 75% 60%, rgba(201,161,90,0.25), transparent 55%)' }} />

      <div className="relative w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -3, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center order-2 md:order-1"
        >
          <div
            className="w-[240px] sm:w-[300px] md:w-[340px] aspect-[3/4] rounded-sm overflow-hidden"
            style={{ boxShadow: '0 25px 60px -15px rgba(0,0,0,0.6)' }}
          >
            <img src={musicCollage} alt="Her music, always playing" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </motion.div>

        <div className="order-1 md:order-2 max-w-lg">
          <p className="text-[color:var(--gold-soft)] text-xs sm:text-sm tracking-[0.4em] uppercase mb-4">Music</p>
          <h2 className="font-display italic text-white text-5xl sm:text-6xl md:text-7xl mb-8 leading-none">
            <RevealText>Music</RevealText>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end gap-[3px] h-8 mb-6 origin-left"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className="w-[2px] bg-[color:var(--gold-soft)]/50"
                style={{ height: `${8 + Math.abs(Math.sin(i * 0.7)) * 24}px` }}
              />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-white/70 text-lg sm:text-xl md:text-2xl leading-relaxed"
          >
            If it's music… just hand her the authority and accept you're
            about to get emotionally rearranged. She'll have a song for
            every mood, every memory, every occasion.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed mt-4 italic font-display"
          >
            At this point, she's basically my living spotify recommendation algorithm disguised as
            a person.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
