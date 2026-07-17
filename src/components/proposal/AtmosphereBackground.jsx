import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * The ambient layer behind every scene: slow drifting blobs, a faint
 * grain texture, tiny stars, and a gentle mouse-parallax tilt.
 * Fixed and pointer-events-none so it never interferes with content.
 */
export default function AtmosphereBackground() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    function handleMove(e) {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const stars = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 6,
    }))
  ).current;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ivory" aria-hidden="true">
      {/* Drifting blurred blobs */}
      <motion.div
        style={{ translateX: springX }}
        className="absolute -top-32 -left-24 h-[32rem] w-[32rem] rounded-full bg-champagne/40 blur-3xl"
        animate={{ x: [0, 30, -10, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-dustyrose/25 blur-3xl"
        animate={{ x: [0, -25, 15, 0], y: [0, -15, 25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ translateY: springY }}
        className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-gold/20 blur-3xl"
        animate={{ x: [0, 20, -20, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tiny glowing stars */}
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-gold/70"
          style={{ top: `${star.top}%`, left: `${star.left}%`, width: star.size, height: star.size }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: 4 + star.delay, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
        />
      ))}

      {/* Faint grain texture, slowly drifting */}
      <motion.div
        className="absolute inset-[-10%] opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        animate={{ x: [0, -8, 0], y: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
