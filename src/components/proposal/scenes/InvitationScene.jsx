import { motion } from "framer-motion";
import DodgingNoButton from "../DodgingNoButton";

export default function InvitationScene({ date, venue, onApprove }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-sm border border-champagne bg-cream/90 p-8 shadow-[0_20px_60px_-20px_rgba(107,93,79,0.3)] sm:p-10"
      >
        <p className="font-script text-3xl text-dustyrose">An Invitation</p>

        <div className="mt-6 space-y-4 text-left font-body text-umber">
          <div>
            <p className="font-ui text-xs uppercase tracking-widest text-warmgrey">Date</p>
            <p className="font-display text-2xl">{date}</p>
          </div>
          <div>
            <p className="font-ui text-xs uppercase tracking-widest text-warmgrey">Venue</p>
            <p className="font-display text-2xl">{venue}</p>
          </div>
        </div>

        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <p className="font-body text-umber">
          You 🤍 + Me 🤍 + Good food + An evening stroll + <span className="italic">NO WORK</span>
        </p>
        <p className="mt-1 font-ui text-xs text-warmgrey">
          (Yes, this clause is absolutely non-negotiable.)
        </p>

        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <p className="font-display text-xl text-umber">Approval Required</p>
        <p className="mt-3 font-body text-sm leading-relaxed text-warmgrey">
          I hereby humbly request the approval of the most beautiful, wonderful, incredibly
          hardworking, and precious person I know to kindly grace this proposal with a heartfelt
          &ldquo;Yes.&rdquo;
        </p>

        <motion.button
          type="button"
          onClick={onApprove}
          whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(201,167,107,0.6)" }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 rounded-full bg-umber px-10 py-3 font-ui text-sm tracking-wide text-ivory"
        >
          Yes
        </motion.button>
      </motion.div>

      {/* Lives in a fixed overlay so it can roam the full viewport */}
      <DodgingNoButton />
    </div>
  );
}
