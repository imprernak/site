import { motion } from 'framer-motion'

const modules = import.meta.glob('../assets/candid/*.jpg', { eager: true, import: 'default' })
const candids = Object.keys(modules).sort().map((k) => modules[k])

export default function Candids() {
  return (
    <section id="chapters" className="relative py-24 md:py-32 bg-[#1c1812] px-6 md:px-16">
      <p className="font-display italic text-white text-3xl sm:text-4xl md:text-5xl mb-10 text-center">
        In Between the Chapters
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {candids.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden rounded-sm ${i === 1 ? 'sm:mt-10' : ''}`}
            style={{ boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)' }}
          >
            <img
              src={src}
              alt={`Candid photograph of Prerna ${i + 1}`}
              loading="lazy"
              className="w-full h-[340px] sm:h-[400px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
