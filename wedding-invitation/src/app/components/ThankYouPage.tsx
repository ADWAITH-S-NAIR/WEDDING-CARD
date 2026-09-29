"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloralDivider } from "./FloralBorder";
import FloatingPetals from "./FloatingPetals";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  shape: "petal" | "circle" | "star";
}

const CONFETTI_COLORS = [
  "#f2c4ce", "#e8a0b0", "#f5e6c8", "#c9a84c",
  "#52b788", "#ffb7c5", "#ffd700", "#fff0e6",
];

function ConfettiCanvas({ count = 60 }: { count?: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const shapes: ConfettiPiece["shape"][] = ["petal", "circle", "star"];
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: Math.random() * 12 + 6,
      delay: Math.random() * 4,
      duration: Math.random() * 5 + 6,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
    setPieces(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: -20 }}
          animate={{
            y: ["0px", "110vh"],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [0, 1, 1, 0],
            x: [0, (Math.random() - 0.5) * 80],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            opacity: { times: [0, 0.1, 0.9, 1] },
          }}
        >
          {p.shape === "circle" && (
            <div
              className="rounded-full"
              style={{ width: p.size, height: p.size, background: p.color, opacity: 0.85 }}
            />
          )}
          {p.shape === "petal" && (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size * 1.6,
                background: p.color,
                opacity: 0.8,
                borderRadius: "50% 50% 50% 0",
              }}
            />
          )}
          {p.shape === "star" && (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color} opacity={0.85}>
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

const SparkleIcon = ({ x, y, delay }: { x: string; y: string; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
      rotate: [0, 180],
    }}
    transition={{ duration: 1.5, delay, repeat: Infinity, repeatDelay: Math.random() * 3 + 2 }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#c9a84c">
      <path d="M12 2L13.09 8.26L19 6.27L15.18 11L19 15.73L13.09 13.74L12 20L10.91 13.74L5 15.73L8.82 11L5 6.27L10.91 8.26L12 2Z" />
    </svg>
  </motion.div>
);

export default function ThankYouPage({ guestCount }: { guestCount: number }) {
  const sparkles = [
    { x: "10%", y: "15%" }, { x: "85%", y: "10%" }, { x: "5%", y: "60%" },
    { x: "90%", y: "55%" }, { x: "50%", y: "5%" }, { x: "20%", y: "85%" },
    { x: "75%", y: "80%" }, { x: "40%", y: "92%" },
  ];

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } },
    hidden: {},
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div
      className="min-h-dvh w-full flex items-center justify-center p-4 md:p-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Confetti */}
      <ConfettiCanvas count={70} />
      <FloatingPetals count={25} active />

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <SparkleIcon key={i} x={s.x} y={s.y} delay={i * 0.4} />
      ))}

      {/* Background bloom */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Card */}
      <motion.div
        className="relative glass-card rounded-3xl w-full max-w-lg mx-auto overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
        style={{ boxShadow: "0 0 80px rgba(201,168,76,0.12), 0 0 160px rgba(201,168,76,0.06), 0 30px 80px rgba(0,0,0,0.5)" }}
      >
        {/* Card interior glow */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(242,196,206,0.1) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 px-8 py-14 md:px-12 md:py-16 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            {/* Blooming flower icon */}
            <motion.div variants={fadeUp}>
              <motion.div
                className="text-6xl md:text-7xl"
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🌸
              </motion.div>
            </motion.div>

            {/* Thank You */}
            <motion.div variants={fadeUp}>
              <h1 className="font-serif-fancy text-5xl md:text-6xl text-gold-gradient font-light text-shadow-gold">
                Thank You!
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} className="w-full">
              <FloralDivider />
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeUp} className="space-y-2 px-2">
              <p className="font-serif-fancy text-xl md:text-2xl text-amber-100/90 italic font-light leading-relaxed">
                We can&apos;t wait to celebrate with you.
              </p>
              <p className="font-sans-clean text-amber-100/50 text-sm leading-7">
                Thank you for confirming your attendance.
                <br />
                We&apos;re so excited to share this beautiful moment with you.
              </p>
            </motion.div>

            {/* Guest count badge */}
            <motion.div
              variants={fadeUp}
              className="relative"
            >
              <motion.div
                className="glass-strong px-8 py-4 rounded-2xl border border-amber-400/30"
                animate={{ boxShadow: ["0 0 20px rgba(201,168,76,0.2)", "0 0 40px rgba(201,168,76,0.5)", "0 0 20px rgba(201,168,76,0.2)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="font-sans-clean text-amber-200/60 text-xs tracking-widest uppercase mb-1">
                  Guests Confirmed
                </p>
                <motion.p
                  className="font-serif-fancy text-4xl text-gold-gradient font-light"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 15 }}
                >
                  {guestCount}
                </motion.p>
                <p className="font-sans-clean text-amber-200/40 text-xs mt-1">
                  {guestCount === 1 ? "Guest" : "Guests"} ✦
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="w-full">
              <FloralDivider />
            </motion.div>

            {/* Floating hearts row */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-6">
              {["🌺", "❤️", "✨", "💐", "🌸"].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-2xl"
                  animate={{ y: [0, -12, 0], scale: [1, 1.2, 1], rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
                  transition={{
                    duration: 2 + i * 0.3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>

            {/* Closing line */}
            <motion.p
              variants={fadeUp}
              className="font-serif-fancy text-lg md:text-xl italic text-amber-200/70 font-light"
            >
              See you on our special day{" "}
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                ❤️
              </motion.span>
            </motion.p>

            {/* Date reminder */}
            <motion.div
              variants={fadeUp}
              className="glass rounded-xl px-6 py-3 border border-amber-400/20"
            >
              <p className="font-sans-clean text-amber-200/50 text-xs tracking-widest uppercase">
                Save the Date
              </p>
              <p className="font-display text-amber-200/80 text-sm italic mt-1">
                Saturday, 14th February 2026
              </p>
              <p className="font-sans-clean text-amber-100/40 text-xs">
                The Grand Palace, Mumbai
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
