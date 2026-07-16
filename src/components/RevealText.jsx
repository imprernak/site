import { motion } from 'framer-motion'

export default function RevealText({ children, className = '', delay = 0 }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, amount: 0.1, margin:'0px 0px -10% 0px' }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}
