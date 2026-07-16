import { motion } from 'framer-motion'
import RevealText from './RevealText'
import litchiImg from '../assets/litchi/litchi.jpg'

const particles = Array.from({ length: 18 })

export default function Litchi() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-[#3a1f2c] via-[#2c1a28] to-[#1c1420] flex items-center overflow-hidden px-6 md:px-16 py-24">
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4 + (i % 4) * 2,
            height: 4 + (i % 4) * 2,
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            background: 'radial-gradient(circle, rgba(243,211,218,0.7), transparent)',
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative w-full grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center order-2 md:order-1"
        >
          <div
            className="w-[240px] sm:w-[300px] md:w-[340px] aspect-[3/4] rounded-sm overflow-hidden"
            style={{ boxShadow: '0 25px 60px -15px rgba(0,0,0,0.6)' }}
          >
            <img src={litchiImg} alt="Organic litchi juice" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </motion.div>

        <div className="order-1 md:order-2 text-center md:text-left">
          <p className="text-[color:var(--litchi)] text-xs sm:text-sm tracking-[0.4em] uppercase mb-4">Litchi Juice</p>
          <h2 className="font-display italic text-white text-5xl sm:text-6xl md:text-7xl mb-8 leading-none">
            <RevealText>Organic Litchi Juice</RevealText>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-white/70 text-lg sm:text-xl md:text-2xl leading-relaxed"
          >
            If it's organic litchi juice… you've just unlocked a core
            childhood memory. One sip and she's mentally back in the good old
            days, acting like life was simpler and every carton tasted like
            happiness.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed mt-4 italic font-display"
          >
            It's less of a drink and more of a nostalgic drink for her.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
