"use client";

import { motion } from "framer-motion";

// SVG floral elements
const FloralCorner = ({ className, rotate = 0 }: { className?: string; rotate?: number }) => (
  <svg
    className={className}
    viewBox="0 0 120 120"
    fill="none"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    {/* Branch */}
    <path d="M10 110 Q40 80 80 40 Q95 25 110 10" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.7" />
    {/* Leaves */}
    <ellipse cx="40" cy="80" rx="12" ry="6" fill="#2d6a4f" opacity="0.5" transform="rotate(-45 40 80)" />
    <ellipse cx="60" cy="60" rx="10" ry="5" fill="#52b788" opacity="0.4" transform="rotate(-45 60 60)" />
    <ellipse cx="80" cy="40" rx="9" ry="4.5" fill="#2d6a4f" opacity="0.5" transform="rotate(-45 80 40)" />
    {/* Flowers */}
    <circle cx="35" cy="85" r="8" fill="#f2c4ce" opacity="0.7" />
    <circle cx="35" cy="85" r="4" fill="#c9a84c" opacity="0.9" />
    <circle cx="65" cy="55" r="7" fill="#f5e6c8" opacity="0.6" />
    <circle cx="65" cy="55" r="3.5" fill="#c9a84c" opacity="0.9" />
    <circle cx="90" cy="30" r="9" fill="#f2c4ce" opacity="0.7" />
    <circle cx="90" cy="30" r="4.5" fill="#e8a0b0" opacity="0.9" />
    {/* Petals around flowers */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <ellipse
        key={i}
        cx={35 + Math.cos((angle * Math.PI) / 180) * 11}
        cy={85 + Math.sin((angle * Math.PI) / 180) * 11}
        rx="5"
        ry="3"
        fill="#f2c4ce"
        opacity="0.5"
        transform={`rotate(${angle} ${35 + Math.cos((angle * Math.PI) / 180) * 11} ${85 + Math.sin((angle * Math.PI) / 180) * 11})`}
      />
    ))}
    {/* Dots / buds */}
    <circle cx="20" cy="100" r="3" fill="#c9a84c" opacity="0.5" />
    <circle cx="50" cy="70" r="2.5" fill="#e8d5a3" opacity="0.6" />
    <circle cx="75" cy="45" r="2" fill="#c9a84c" opacity="0.4" />
    <circle cx="100" cy="20" r="3" fill="#f2c4ce" opacity="0.5" />
  </svg>
);

const FloralDivider = () => (
  <svg viewBox="0 0 400 40" fill="none" className="w-full max-w-xs mx-auto opacity-70">
    <line x1="0" y1="20" x2="150" y2="20" stroke="#c9a84c" strokeWidth="0.75" />
    <circle cx="170" cy="20" r="8" fill="#f2c4ce" opacity="0.7" />
    <circle cx="170" cy="20" r="4" fill="#c9a84c" />
    <circle cx="200" cy="20" r="12" fill="#f2c4ce" opacity="0.8" />
    <circle cx="200" cy="20" r="5" fill="#c9a84c" />
    <circle cx="230" cy="20" r="8" fill="#f2c4ce" opacity="0.7" />
    <circle cx="230" cy="20" r="4" fill="#c9a84c" />
    <line x1="250" y1="20" x2="400" y2="20" stroke="#c9a84c" strokeWidth="0.75" />
    {/* Leaves */}
    <ellipse cx="185" cy="14" rx="6" ry="3" fill="#52b788" opacity="0.5" transform="rotate(-30 185 14)" />
    <ellipse cx="215" cy="26" rx="6" ry="3" fill="#2d6a4f" opacity="0.5" transform="rotate(30 215 26)" />
  </svg>
);

export default function FloralBorder() {
  const corners = [
    { rotate: 0, className: "top-0 left-0" },
    { rotate: 90, className: "top-0 right-0" },
    { rotate: 180, className: "bottom-0 right-0" },
    { rotate: 270, className: "bottom-0 left-0" },
  ];

  return (
    <>
      {/* Corner florals */}
      {corners.map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.className} w-28 h-28 md:w-36 md:h-36 pointer-events-none`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <FloralCorner rotate={corner.rotate} className="w-full h-full" />
        </motion.div>
      ))}

      {/* Top divider */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      >
        <FloralDivider />
      </motion.div>

      {/* Bottom divider */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        <FloralDivider />
      </motion.div>
    </>
  );
}

export { FloralDivider };
