import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AtmosphereBackground from "./AtmosphereBackground";
import LetterScene from "./scenes/LetterScene";
import DateScene from "./scenes/DateScene";
import VenueScene from "./scenes/VenueScene";
import InvitationScene from "./scenes/InvitationScene";
import FinalScene from "./scenes/FinalScene";

const fadeTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

export default function ProposalExperience() {
  const [chapter, setChapter] = useState("letter");
  const [selection, setSelection] = useState({ date: "", venue: "", customSuggestion: "" });

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <AtmosphereBackground />

      <AnimatePresence mode="wait">
        {chapter === "letter" && (
          <motion.div key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
            <LetterScene onContinue={() => setChapter("date")} />
          </motion.div>
        )}

        {chapter === "date" && (
          <motion.div key="date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
            <DateScene
              onSelect={(date) => {
                setSelection((s) => ({ ...s, date }));
                setChapter("venue");
              }}
            />
          </motion.div>
        )}

        {chapter === "venue" && (
          <motion.div key="venue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
            <VenueScene
              onSelect={(venue, customSuggestion) => {
                setSelection((s) => ({ ...s, venue, customSuggestion }));
                setChapter("invitation");
              }}
            />
          </motion.div>
        )}

        {chapter === "invitation" && (
          <motion.div key="invitation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fadeTransition}>
            <InvitationScene date={selection.date} venue={selection.venue} onApprove={() => setChapter("final")} />
          </motion.div>
        )}

        {chapter === "final" && (
          <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fadeTransition}>
            <FinalScene date={selection.date} venue={selection.venue} customSuggestion={selection.customSuggestion} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
