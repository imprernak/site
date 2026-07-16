import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative bg-[#12100d] py-32 md:py-40 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(201,161,90,0.12), transparent 60%)' }}
      />
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative font-display italic text-white text-3xl sm:text-4xl md:text-6xl leading-tight max-w-3xl"
      >
        This is where the website ends.
        <br />
        <span className="text-white/50">Her beautifully organized chaos doesn't.</span>
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-16 h-[1px] bg-[color:var(--gold-soft)]/50 mt-10"
      />
      <p className="relative text-white/30 text-xs tracking-[0.3em] uppercase mt-8">
        Prerna &middot; The Muse
      </p>
    </footer>
  )
}
