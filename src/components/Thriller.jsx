import { motion } from 'framer-motion'
import RevealText from './RevealText'
import book from '../assets/thriller/book.jpg'

export default function Thriller() {
  return (
    <section className="relative min-h-[95vh] bg-[#0e0c0a] flex items-center overflow-hidden px-6 md:px-16 py-24">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(120,10,10,0.35), transparent)',
        }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originY: 0 }}
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-red-900/0 via-red-800/60 to-red-900/0 hidden md:block"
      />

      <div className="relative w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[220px] sm:w-[280px] md:w-[320px] rounded-sm overflow-hidden"
            style={{ boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7)' }}
          >
            <img
              src={book}
              alt="Her current thriller read"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="order-1 md:order-2 max-w-lg">
          <p className="text-red-800/80 text-xs sm:text-sm tracking-[0.4em] uppercase mb-4">Thriller Book</p>
          <h2 className="font-display italic text-white text-5xl sm:text-6xl md:text-7xl mb-8 leading-none">
            <RevealText>Thriller</RevealText>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-white/70 text-lg sm:text-xl md:text-2xl leading-relaxed"
          >
            If it's anything with thriller especially one with a psychologically
            unhinged woman whose hobbies include murder and terrible life
            choices, you can be certain she'll devour it like a
            Michelin-starred meal.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-white/50 text-base sm:text-lg md:text-xl leading-relaxed mt-4 italic font-display"
          >
            At this point, if the female lead isn't at least slightly
            homicidal, she'll probably ask for a refund.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
