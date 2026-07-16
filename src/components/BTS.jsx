import { motion } from 'framer-motion'
import RevealText from './RevealText'
import jungkook from '../assets/bts/jungkook.jpg'

export default function BTS() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-[#241a2e] via-[#2e2038] to-[#1a1420] flex items-center overflow-hidden px-6 md:px-16 py-24">
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 40%, rgba(155,110,200,0.25), transparent 55%)' }} />

      <div className="relative w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center order-2 md:order-1"
        >
          <div
            className="w-[240px] sm:w-[300px] md:w-[340px] aspect-[3/4] rounded-sm overflow-hidden border border-[color:var(--plum-soft)]/30"
            style={{ boxShadow: '0 25px 60px -15px rgba(0,0,0,0.6)' }}
          >
            <img src={jungkook} alt="Jung Kook" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </motion.div>

        <div className="order-1 md:order-2 max-w-lg mx-auto md:mx-0 text-center md:text-left">
          <p className="text-[color:var(--plum-soft)] text-sm sm:text-sm tracking-[0.4em] uppercase mb-4">BTS</p>
          <h2 className="font-display italic text-white text-5xl sm:text-6xl md:text-7xl mb-8 leading-none">
            <RevealText>Jung Kook</RevealText>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-white/70 text-lg sm:text-xl md:text-2xl leading-relaxed"
          >
            A soft spot reserved, permanently, for one member of BTS - JK :/ not adding more picture heres :(
          </motion.p>
        </div>
      </div>
    </section>
  )
}
