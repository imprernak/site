import { useState } from "react";
import { motion } from "framer-motion";

const VENUES = [
  "United Coffee House — Connaught Place",
  "32nd Avenue Barracks — Connaught Place",
  "Plum — Connaught Place",
  "Kala Swati — Connaught Place",
  "The Big Chill — Connaught Place",
  "Himalayan Kitchen — Connaught Place",
  "Cafe De Flora",
  "Gardin",
  "Mia Bella",
  "Pot Belly",
];

const OTHER_ID = "__other__";

export default function VenueScene({ onSelect }) {
  const [selected, setSelected] = useState(null);
  const [customText, setCustomText] = useState("");

  const canContinue = selected && (selected !== OTHER_ID || customText.trim().length > 0);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="font-display text-4xl font-medium text-umber sm:text-5xl"
      >
        Where shall we disappear?
      </motion.h2>

      <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {VENUES.map((venue, i) => {
          const isSelected = selected === venue;
          const isMiaBella = venue === "Mia Bella";
          return (
            <motion.button
              key={venue}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              whileHover={{ y: -3 }}
              onClick={() => setSelected(venue)}
              aria-pressed={isSelected}
              className={`rounded-xl border px-5 py-4 text-left font-body transition-all ${
                isSelected
                  ? "border-gold bg-champagne/60 shadow-[0_10px_30px_-12px_rgba(201,167,107,0.6)]"
                  : "border-champagne/70 bg-cream/70 hover:border-gold/60"
              }`}
            >
              <span className="text-umber">{venue}</span>
              {isMiaBella && (
                <span className="ml-2 font-ui text-xs text-dustyrose">Perfect Sunset View ✨</span>
              )}
            </motion.button>
          );
        })}

        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 * VENUES.length }}
          whileHover={{ y: -3 }}
          onClick={() => setSelected(OTHER_ID)}
          aria-pressed={selected === OTHER_ID}
          className={`rounded-xl border px-5 py-4 text-left font-body italic transition-all sm:col-span-2 ${
            selected === OTHER_ID
              ? "border-gold bg-champagne/60"
              : "border-dashed border-warmgrey/50 bg-transparent hover:border-gold/60"
          }`}
        >
          Any Other Suggestion
        </motion.button>
      </div>

      {selected === OTHER_ID && (
        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 w-full max-w-md rounded-full border border-champagne bg-cream/80 px-5 py-3 text-center font-body text-umber placeholder:text-warmgrey/70 focus:border-gold focus:outline-none"
          placeholder="I have a better idea..."
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
        />
      )}

      {canContinue && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            onSelect(
              selected === OTHER_ID ? customText.trim() : selected,
              selected === OTHER_ID ? customText.trim() : ""
            )
          }
          className="mt-10 rounded-full bg-umber px-8 py-3 font-ui text-sm tracking-wide text-ivory"
        >
          Continue →
        </motion.button>
      )}
    </div>
  );
}
