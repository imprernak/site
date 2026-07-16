import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const links = ['Muse', 'Delights', 'Gallery', 'Chapters']
const projects = [
  { label: 'The Sunflower Garden', href: 'https://www.prernathemuse.site/sunflower-garden' },
  { label: 'Musical Gift', href: 'https://www.prernathemuse.site/musical-gift' },
  { label: 'Hydration Reminder', href: 'https://www.prernathemuse.site/hydration-reminder' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [projectsOpenMobile, setProjectsOpenMobile] = useState(false)

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-5">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2"
      >
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
          <path d="M14 2L24 14L14 26L4 14L14 2Z" fill="white" opacity="0.85" />
          <path d="M14 8L19 14L14 20L9 14L14 8Z" fill="white" opacity="0.5" />
        </svg>
        <span className="text-white text-base sm:text-lg font-display italic tracking-tight">Prerna</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex items-center gap-8"
      >
        {links.map((l) => (
          <button
            key={l}
            onClick={() => scrollTo(l.toLowerCase())}
            className="text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase font-medium transition-colors"
          >
            {l}
          </button>
        ))}

        <div
          className="relative"
          onMouseEnter={() => setProjectsOpen(true)}
          onMouseLeave={() => setProjectsOpen(false)}
        >
          <button
            onClick={() => setProjectsOpen((v) => !v)}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase font-medium transition-colors"
          >
            Projects for Her
            <ChevronDown
              size={14}
              className="transition-transform duration-200"
              style={{ transform: projectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
          <AnimatePresence>
            {projectsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.96 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="!absolute top-full left-0 mt-2 liquid-glass rounded-xl py-3 px-2 min-w-[220px] shadow-xl"
              >
                {projects.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    className="block text-white/80 hover:text-white text-sm rounded-lg px-3 py-2 hover:bg-white/5 transition-colors tracking-wide"
                  >
                    {p.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        onClick={() => setOpen(!open)}
        className="md:hidden text-white relative w-6 h-6"
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex items-center justify-center">
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex items-center justify-center">
              <Menu size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-5 right-5 mt-2 bg-[#1c1812]/95 backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-1"
          >
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="text-left text-white/85 hover:text-white text-sm py-3 border-b border-white/10 tracking-wide"
              >
                {l}
              </button>
            ))}

            <button
              onClick={() => setProjectsOpenMobile((v) => !v)}
              className="flex items-center justify-between text-left text-white/85 hover:text-white text-sm py-3 border-b border-white/10 last:border-0 tracking-wide"
            >
              Projects for Her
              <ChevronDown
                size={16}
                className="transition-transform duration-200"
                style={{ transform: projectsOpenMobile ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            <AnimatePresence>
              {projectsOpenMobile && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden flex flex-col pl-4"
                >
                  {projects.map((p) => (
                    <a
                      key={p.label}
                      href={p.href}
                      className="text-white/60 hover:text-white text-sm py-2.5 tracking-wide"
                    >
                      {p.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
