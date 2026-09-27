"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloralBorder, { FloralDivider } from "./FloralBorder";
import FloatingPetals from "./FloatingPetals";

const WEDDING_DATE = "Saturday, 14th February 2026";
const VENUE = "The Grand Palace, Mumbai";

const DeclineModal = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="absolute inset-0 bg-black/70"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
    <FloatingPetals count={30} active />
    <motion.div
      className="relative glass-card rounded-3xl p-8 md:p-12 max-w-md w-full text-center z-10"
      initial={{ scale: 0.8, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Falling blossoms */}
      <motion.div
        className="text-6xl mb-6"
        animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        🌸
      </motion.div>

      <motion.h2
        className="font-serif-fancy text-3xl md:text-4xl text-gold-gradient mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        We&apos;ll Miss You
      </motion.h2>

      <motion.div
        className="my-4"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.4 }}
      >
        <FloralDivider />
      </motion.div>

      <motion.p
        className="font-sans-clean text-amber-100/80 text-base leading-relaxed mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Thank you for your wishes and blessings.
        <br />
        <span className="text-amber-200/60 text-sm">
          Though you can&apos;t be with us, you&apos;ll be in our hearts on this special day.
        </span>
      </motion.p>

      {/* Floating hearts */}
      <div className="flex justify-center gap-4 mb-8">
        {["❤️", "🌹", "✨"].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-2xl"
            animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="btn-premium px-8 py-3 rounded-full border border-amber-400/40 glass text-amber-200 font-sans-clean text-sm tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Close
      </motion.button>
    </motion.div>
  </motion.div>
);

export default function InvitationPage({ onConfirm }: { onConfirm: () => void }) {
  const [showDecline, setShowDecline] = useState(false);

  const stagger = {
    visible: { transition: { staggerChildren: 0.12 } },
    hidden: {},
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      className="min-h-dvh w-full flex items-center justify-center p-4 md:p-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.7 }}
    >
      <FloatingPetals count={18} active />

      {/* Main invitation card */}
      <motion.div
        className="relative glass-card rounded-3xl w-full max-w-2xl mx-auto overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ boxShadow: "0 0 60px rgba(201,168,76,0.1), 0 0 120px rgba(201,168,76,0.05), 0 30px 60px rgba(0,0,0,0.4)" }}
      >
        {/* Background gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(242,196,206,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(201,168,76,0.1) 0%, transparent 60%)",
          }}
        />

        {/* Floral border decorations */}
        <FloralBorder />

        {/* Content */}
        <motion.div
          className="relative z-10 px-8 py-14 md:px-14 md:py-16 text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* 'We invite you' tag */}
          <motion.p
            variants={fadeUp}
            className="font-sans-clean text-amber-200/50 text-xs tracking-[0.5em] uppercase mb-6"
          >
            ✦ You are cordially invited ✦
          </motion.p>

          {/* Couple names */}
          <motion.div variants={fadeUp} className="mb-3">
            <h1 className="font-serif-fancy text-5xl md:text-7xl text-gold-gradient font-light leading-tight text-shadow-gold">
              Arjun
            </h1>
            <motion.div
              className="flex items-center justify-center gap-4 my-2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/40" />
              <span className="font-serif-fancy text-amber-300/70 text-2xl italic">&amp;</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/40" />
            </motion.div>
            <h1 className="font-serif-fancy text-5xl md:text-7xl text-gold-gradient font-light leading-tight text-shadow-gold">
              Priya
            </h1>
          </motion.div>

          {/* Date & venue */}
          <motion.div variants={fadeUp} className="my-6 space-y-1">
            <p className="font-display text-amber-200/90 text-lg md:text-xl tracking-wide italic">
              {WEDDING_DATE}
            </p>
            <p className="font-sans-clean text-amber-100/50 text-sm tracking-widest uppercase">
              {VENUE}
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <FloralDivider />
          </motion.div>

          {/* Invitation letter */}
          <motion.div
            variants={fadeUp}
            className="my-8 px-2 md:px-6"
          >
            <p className="font-serif-fancy text-amber-100/80 text-xl md:text-2xl italic leading-relaxed font-light">
              Together with our families,
              <br />
              we joyfully invite you to celebrate
              <br />
              <span className="text-gold-gradient font-normal not-italic">our wedding ceremony.</span>
            </p>
            <p className="font-sans-clean text-amber-100/50 text-sm leading-7 mt-4">
              Your presence will make our special day even more memorable.
              <br />
              Join us as we begin this beautiful journey together.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-8">
            <FloralDivider />
          </motion.div>

          {/* RSVP question */}
          <motion.div variants={fadeUp} className="mb-8">
            <p className="font-serif-fancy text-amber-200/80 text-xl md:text-2xl italic font-light">
              Will you be joining our wedding?
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Yes button */}
            <motion.button
              onClick={onConfirm}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(82,183,136,0.5), 0 0 60px rgba(82,183,136,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="btn-premium group relative flex items-center gap-3 px-8 py-4 rounded-2xl w-full sm:w-auto min-w-[200px] justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(45,106,79,0.6) 0%, rgba(82,183,136,0.4) 100%)",
                border: "1px solid rgba(82,183,136,0.5)",
                backdropFilter: "blur(20px)",
              }}
            >
              <span className="text-2xl">✅</span>
              <span className="font-sans-clean text-emerald-100 font-medium tracking-wide">
                Yes, I&apos;ll be there
              </span>
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ background: "linear-gradient(135deg, rgba(82,183,136,0.1), rgba(82,183,136,0))" }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>

            {/* No button */}
            <motion.button
              onClick={() => setShowDecline(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(232,160,176,0.4), 0 0 60px rgba(232,160,176,0.15)" }}
              whileTap={{ scale: 0.97 }}
              className="btn-premium flex items-center gap-3 px-8 py-4 rounded-2xl w-full sm:w-auto min-w-[200px] justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(80,20,30,0.6) 0%, rgba(160,40,60,0.3) 100%)",
                border: "1px solid rgba(232,160,176,0.3)",
                backdropFilter: "blur(20px)",
              }}
            >
              <span className="text-2xl">❌</span>
              <span className="font-sans-clean text-rose-200/90 font-medium tracking-wide">
                Sorry, I can&apos;t
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decline modal */}
      <AnimatePresence>
        {showDecline && <DeclineModal onClose={() => setShowDecline(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}
