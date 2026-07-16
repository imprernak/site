import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import portrait from '../assets/portrait/portrait.jpg'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260703_053131_1ec3dd1c-d627-44fb-ab20-6e1fce41b0d5.mp4'

export default function Hero() {
  const ref = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, 140])
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const handle = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <section ref={ref} className="relative w-full h-[100svh] overflow-hidden flex flex-col" id="muse">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12100d] via-transparent to-black/30" />

      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-6 md:px-16 pt-24">
        <motion.div
          style={{
            y: yText,
            opacity,
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-center md:text-left max-w-md order-2 md:order-1"
        >
          <p className="text-gold-soft text-[11px] tracking-[0.4em] uppercase text-[color:var(--gold-soft)] mb-4">
            A Portrait, In Fragments
          </p>
          <h1 className="font-display italic text-white text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight">
            Prerna
          </h1>
          <p className="font-display text-white/70 text-2xl sm:text-3xl md:text-4xl mt-1 tracking-tight">
            The Muse
          </p>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed mt-6 max-w-sm mx-auto md:mx-0">
            Equal parts thriller-novel menace and sunflower softness —
            a slow unfolding of the small, specific things she loves.
          </p>
        </motion.div>

        <motion.div
          style={{
            y: yPortrait,
            rotateX: mouse.y * -4,
            rotateY: mouse.x * 4,
          }}
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-2 relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-[220px] sm:w-[280px] md:w-[340px] lg:w-[380px] aspect-[3/4] rounded-sm overflow-hidden"
            style={{ boxShadow: '0 30px 80px -20px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.08)' }}
          >
            <img
              src={portrait}
              alt="Portrait of Prerna"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </motion.div>
          <div className="absolute -bottom-3 -right-3 -z-10 w-full h-full border border-[color:var(--gold-soft)]/40 rounded-sm" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 pb-8 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase">Scroll to discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/70 to-transparent"
        />
      </motion.div>
    </section>
  )
}
