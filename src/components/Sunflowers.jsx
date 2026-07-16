import { motion } from 'framer-motion'
import RevealText from './RevealText'
import sunflowerImg from '../assets/sunflower/sunflower.jpg'

export default function Sunflowers() {
  return (
    <section className="relative min-h-[95vh] bg-gradient-to-b from-[#3a2c12] via-[#5a4318] to-[#2a1f0e] flex items-center overflow-hidden px-6 md:px-16 py-24">
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(255,200,80,0.35), transparent 55%)' }} />

      <div className="relative w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="max-w-lg">
          <p className="text-[color:var(--gold-soft)] text-xs sm:text-sm tracking-[0.4em] uppercase mb-4">Sunflowers</p>
          <h2 className="font-display italic text-white text-5xl sm:text-6xl md:text-7xl mb-8 leading-none">
            <RevealText>Sunflowers</RevealText>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-white/80 text-lg sm:text-xl md:text-2xl leading-relaxed"
          >
            If it's sunflowers… congratulations, you've found her other
            personality. Her soul is a sunflower, forever reaching for the light and quietly becoming it even in the dark. There is no such things as too much sunflower in her life...  "
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-white/60 text-base sm:text-lg md:text-xl leading-relaxed mt-4 italic font-display"
          >
            Thriller books feed her inner psychopath. Sunflowers keep her
            looking innocent. The balance is important.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center"
        >
          <div
            className="w-[260px] sm:w-[320px] md:w-[360px] aspect-[3/4] rounded-sm overflow-hidden"
            style={{ boxShadow: '0 25px 60px -15px rgba(0,0,0,0.6)' }}
          >
            <img src={sunflowerImg} alt="Sunflowers in golden light" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
