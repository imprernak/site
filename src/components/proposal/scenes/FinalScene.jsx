import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { submitProposal } from "../../../lib/submitProposal";

export default function FinalScene({ date, venue, customSuggestion }) {
  const [status, setStatus] = useState("sending");

  useEffect(() => {
    let cancelled = false;

    async function fireConfetti() {
      const confetti = (await import("canvas-confetti")).default;
      const duration = 2200;
      const end = Date.now() + duration;
      const colors = ["#C9A76B", "#C98F82", "#E8D9B5", "#F7F1E7"];

      (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 60, origin: { x: 0 }, colors });
        confetti({ particleCount: 3, angle: 120, spread: 60, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }

    fireConfetti();

    submitProposal({ date, venue, customSuggestion }).then((ok) => {
      if (!cancelled) setStatus(ok ? "sent" : "failed");
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="h-10 w-10 fill-dustyrose text-dustyrose" />
        </motion.div>

        <h2 className="mt-6 font-display text-3xl text-umber sm:text-4xl">
          Thank you for your approval. ✨
        </h2>
        <p className="mt-4 max-w-md font-body text-lg text-warmgrey">
          Your response has been successfully received and processed.
          <br />
          No further action is required from you.
          <br />
          The rest shall be managed by yours truly.
        </p>
        <p className="mt-4 font-script text-2xl text-dustyrose">Looking forward to seeing you. ♡</p>

        {status === "failed" && (
          <p className="mt-6 font-ui text-xs text-warmgrey">
            (Your answer is saved locally — the notification email couldn't be sent. Check the
            Formspree endpoint in your environment settings.)
          </p>
        )}
      </motion.div>
    </div>
  );
}
