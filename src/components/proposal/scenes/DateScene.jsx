import { useState } from "react";
import { motion } from "framer-motion";

const DATE_OPTIONS = [
  {
    id: "jul18",
    label: "18th July · 4 PM onwards",
    note: "Subtle note: subject to change if the forthcoming of muse takes time.",
  },
  {
    id: "jul19",
    label: "19th July · 4 PM onwards",
    note: "Let's just take the whole afternoon. Who cares? Deadlines can wait.",
  },
  {
    id: "nextweek",
    label: "Next Week",
    note: "Good things are worth scheduling.",
  },
];

export default function DateScene({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="font-display text-4xl font-medium text-umber sm:text-5xl"
      >
        Choose Your Escape
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mt-3 font-body text-lg italic text-warmgrey"
      >
        When shall this take place?
      </motion.p>

      <div className="mt-12 grid w-full max-w-2xl gap-5 sm:grid-cols-1">
        {DATE_OPTIONS.map((opt, i) => {
          const isSelected = selected === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ y: -3 }}
              onClick={() => setSelected(opt.id)}
              aria-pressed={isSelected}
              className={`rounded-2xl border px-6 py-5 text-left font-body transition-all ${
                isSelected
                  ? "border-gold bg-champagne/60 shadow-[0_10px_30px_-12px_rgba(201,167,107,0.6)]"
                  : "border-champagne/70 bg-cream/70 hover:border-gold/60"
              }`}
            >
              <span className="block font-display text-xl text-umber">{opt.label}</span>
              <span className="mt-1 block font-ui text-xs text-warmgrey">{opt.note}</span>
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(DATE_OPTIONS.find((d) => d.id === selected).label)}
          className="mt-10 rounded-full bg-umber px-8 py-3 font-ui text-sm tracking-wide text-ivory"
        >
          Continue →
        </motion.button>
      )}
    </div>
  );
}
