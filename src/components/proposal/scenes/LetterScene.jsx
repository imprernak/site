import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const LETTER_TEXT = `Work has been stealing far too much of you lately… and from the looks of it, it's only going to get busier.

So, before the deadlines multiply and work declares war on your peace, I have a tiny proposal.

For once, let's forget the annual report, the constant pinging for pages, and the endless task list… as sir calls it.

You spend so much of yourself at work that I think it's only fair we steal a little time back, just for you.

Something quiet and genuine.
Confirm below to continue and uncover the plan for you. ♡`;

export default function LetterScene({ onContinue }) {
  const [unfolded, setUnfolded] = useState(false);
  const [typed, setTyped] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const unfoldTimer = setTimeout(() => setUnfolded(true), reduced ? 100 : 900);
    return () => clearTimeout(unfoldTimer);
  }, [reduced]);

  useEffect(() => {
    if (!unfolded) return;
    if (reduced) {
      setTyped(LETTER_TEXT);
      setDoneTyping(true);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(LETTER_TEXT.slice(0, i));
      if (i >= LETTER_TEXT.length) {
        clearInterval(interval);
        setDoneTyping(true);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [unfolded, reduced]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6 py-16">
      <motion.div
        initial={{ rotateX: -90, opacity: 0 }}
        animate={unfolded ? { rotateX: 0, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
        className="relative w-full max-w-xl rounded-sm border border-champagne bg-cream/90 p-8 shadow-[0_20px_60px_-20px_rgba(107,93,79,0.3)] backdrop-blur-sm sm:p-12"
      >
        <Sparkles className="absolute -top-4 -left-4 h-6 w-6 text-gold opacity-70" aria-hidden="true" />
        <p className="mb-6 font-script text-3xl text-dustyrose sm:text-4xl">For you,</p>
        <p className="min-h-[280px] whitespace-pre-line font-body text-lg leading-relaxed text-umber sm:text-xl">
          {typed}
          {!doneTyping && <span className="animate-pulse">|</span>}
        </p>

        {doneTyping && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-10 flex justify-center"
          >
            <motion.button
              type="button"
              onClick={onContinue}
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(201,167,107,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-umber px-8 py-3 font-ui text-sm tracking-wide text-ivory transition-colors hover:bg-umber/90"
            >
              Continue →
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
