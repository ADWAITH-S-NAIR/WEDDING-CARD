"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BloomingFlower = ({ x, y, delay, size = 60 }: { x: string; y: string; delay: number; size?: number }) => {
  const petals = 6;
  return (
    <motion.svg
      viewBox="-50 -50 100 100"
      style={{ width: size, height: size, position: "absolute", left: x, top: y }}
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 1.4, delay, ease: [0.34, 1.56, 0.64, 1] as const }}
    >
      {/* Center glow */}
      <circle cx="0" cy="0" r="18" fill="rgba(201,168,76,0.15)" />
      {/* Petals */}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i * 360) / petals;
        return (
          <motion.ellipse
            key={i}
            cx={0}
            cy={-22}
            rx={9}
            ry={18}
            fill={i % 2 === 0 ? "#f2c4ce" : "#f5e6c8"}
            opacity={0.85}
            transform={`rotate(${angle})`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: delay + 0.3 + i * 0.08 }}
            style={{ transformOrigin: "0 0" }}
          />
        );
      })}
      {/* Inner petals */}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i * 360) / petals + 30;
        return (
          <motion.ellipse
            key={`inner-${i}`}
            cx={0}
            cy={-14}
            rx={5}
            ry={12}
            fill="#e8a0b0"
            opacity={0.7}
            transform={`rotate(${angle})`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.6 + i * 0.06 }}
            style={{ transformOrigin: "0 0" }}
          />
        );
      })}
      {/* Center */}
      <circle cx="0" cy="0" r="10" fill="#c9a84c" />
      <circle cx="0" cy="0" r="6" fill="#f5e6c8" />
      <circle cx="0" cy="0" r="3" fill="#c9a84c" />
    </motion.svg>
  );
};

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setShowEnter(true);
          return 100;
        }
        return prev + 1;
      });
    }, 28);
    return () => clearInterval(timer);
  }, []);

  const flowers = [
    { x: "5%", y: "10%", delay: 0.2, size: 55 },
    { x: "80%", y: "5%", delay: 0.5, size: 65 },
    { x: "75%", y: "70%", delay: 0.8, size: 50 },
    { x: "5%", y: "75%", delay: 1.1, size: 60 },
    { x: "40%", y: "3%", delay: 0.35, size: 40 },
    { x: "85%", y: "40%", delay: 0.65, size: 45 },
    { x: "3%", y: "45%", delay: 0.95, size: 42 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-romantic overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Blooming flowers */}
      {flowers.map((f, i) => (
        <BloomingFlower key={i} {...f} />
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Ring animation */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[80, 100, 120].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-amber-400/20"
              style={{ width: size, height: size }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
              transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <motion.div
            className="w-16 h-16 rounded-full glass-strong flex items-center justify-center"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-3xl">💍</span>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h1 className="font-serif-fancy text-5xl md:text-6xl text-gold-gradient font-light tracking-wider">
            Arjun & Priya
          </h1>
          <p className="font-sans-clean text-amber-200/60 text-sm tracking-[0.4em] mt-2 uppercase">
            Wedding Invitation
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-64 md:w-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #c9a84c, #f5e6c8, #c9a84c)",
                backgroundSize: "200% auto",
              }}
              animate={{ width: `${progress}%`, backgroundPosition: ["0% center", "200% center"] }}
              transition={{ backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" } }}
            />
          </div>
          <p className="text-center text-amber-200/40 text-xs mt-2 font-sans-clean tracking-widest">
            {progress < 100 ? "Preparing your invitation..." : "Ready"}
          </p>
        </motion.div>

        {/* Enter button */}
        {showEnter && (
          <motion.button
            onClick={onComplete}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-premium px-10 py-3.5 rounded-full border border-amber-400/40 glass text-amber-200 font-sans-clean text-sm tracking-widest uppercase animate-pulse-glow"
          >
            Open Invitation ✨
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
