"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  color: string;
  type: "petal" | "heart" | "star";
}

const PETAL_COLORS = ["#f2c4ce", "#e8a0b0", "#f5e6c8", "#c9a84c40", "#d4b896", "#ffb7c5"];

function PetalSVG({ color, type }: { color: string; type: "petal" | "heart" | "star" }) {
  if (type === "heart") {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill={color}>
        <path d="M8 14s-6-4.35-6-8a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 3.65-6 8-6 8z" />
      </svg>
    );
  }
  if (type === "star") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill={color}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 40 40">
      <ellipse cx="20" cy="20" rx="8" ry="16" fill={color} transform="rotate(-30 20 20)" />
      <ellipse cx="20" cy="20" rx="8" ry="16" fill={color} opacity="0.6" transform="rotate(30 20 20)" />
    </svg>
  );
}

export default function FloatingPetals({ count = 20, active = true }: { count?: number; active?: boolean }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const types: Array<"petal" | "heart" | "star"> = ["petal", "petal", "petal", "heart", "star"];
    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 1 + 0.6,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 7,
      rotation: Math.random() * 360,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      type: types[Math.floor(Math.random() * types.length)],
    }));
    setPetals(generated);
  }, [count]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: -40,
            scale: petal.size,
          }}
          animate={{
            y: ["0vh", "115vh"],
            x: [0, Math.sin(petal.id) * 80, Math.cos(petal.id) * 40, 0],
            rotate: [petal.rotation, petal.rotation + 360],
            opacity: [0, 0.9, 0.8, 0.6, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <PetalSVG color={petal.color} type={petal.type} />
        </motion.div>
      ))}
    </div>
  );
}
