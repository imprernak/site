import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOOLTIPS = [
  "Nice try 😌",
  "That option resigned.",
  "Denied.",
  "Nope.",
  "Mission failed.",
  "You weren't supposed to click that.",
  "Still unavailable.",
];

const DODGE_RADIUS = 140; // px — how close the cursor can get before it flees
const BUTTON_W = 120;
const BUTTON_H = 52;
const MARGIN = 24;

/**
 * A "No" button that is never actually clickable. It watches for the
 * pointer approaching and teleports to a new safe spot, always fully
 * inside the viewport. On touch devices, a tap attempt does the same.
 */
export default function DodgingNoButton() {
  const [pos, setPos] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const tooltipTimeout = useRef(null);
  const dodgeCount = useRef(0);

  const showTooltip = useCallback(() => {
    const msg = TOOLTIPS[dodgeCount.current % TOOLTIPS.length];
    dodgeCount.current += 1;
    setTooltip(msg);
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    tooltipTimeout.current = setTimeout(() => setTooltip(null), 1400);
  }, []);

  const dodge = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = MARGIN + Math.random() * (vw - BUTTON_W - MARGIN * 2);
    const y = MARGIN + Math.random() * (vh - BUTTON_H - MARGIN * 2);
    setPos({ x, y });
    showTooltip();
  }, [showTooltip]);

  const handlePointerMove = useCallback(
    (e) => {
      const el = document.getElementById("no-button");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist < DODGE_RADIUS) dodge();
    },
    [dodge]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40" onPointerMove={handlePointerMove}>
      <motion.button
        id="no-button"
        type="button"
        aria-label="No (this button cannot be selected)"
        className="pointer-events-auto absolute rounded-full border border-warmgrey/40 bg-cream/80 px-6 py-3 font-ui text-sm text-umber shadow-sm backdrop-blur-sm"
        style={pos ? { left: pos.x, top: pos.y } : { position: "relative" }}
        animate={pos ? { left: pos.x, top: pos.y, rotate: [0, -8, 8, 0] } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        onPointerDown={(e) => {
          e.preventDefault();
          dodge();
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          dodge();
        }}
      >
        No
      </motion.button>

      <AnimatePresence>
        {tooltip && pos && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="pointer-events-none absolute rounded-full bg-umber px-3 py-1 font-ui text-xs text-ivory shadow-md"
            style={{ left: pos.x, top: pos.y - 36 }}
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
