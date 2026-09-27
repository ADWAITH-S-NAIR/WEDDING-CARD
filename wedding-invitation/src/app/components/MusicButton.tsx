"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicButton() {
  const [muted, setMuted] = useState(true);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={() => setMuted(!muted)}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center cursor-pointer group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={muted ? "Unmute music" : "Mute music"}
      title={muted ? "Enable music" : "Disable music"}
    >
      {/* Animated rings when unmuted */}
      <AnimatePresence>
        {!muted && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-amber-400/30"
                initial={{ width: 48, height: 48, opacity: 0.6 }}
                animate={{ width: 48 + i * 16, height: 48 + i * 16, opacity: 0 }}
                transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {muted ? (
          <motion.svg
            key="muted"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-amber-300"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </motion.svg>
        ) : (
          <motion.svg
            key="unmuted"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-amber-300"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
