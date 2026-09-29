"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from "framer-motion";
import { FloralDivider } from "./FloralBorder";
import { supabase } from "../../lib/supabase";

const NUMBERS = Array.from({ length: 10 }, (_, i) => i + 1);
const ITEM_HEIGHT = 64;

function WheelPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const startOffset = useRef(0);
  const offsetY = useMotionValue(-(value - 1) * ITEM_HEIGHT);

  const clampedIndex = useTransform(offsetY, (v) => {
    const idx = Math.round(-v / ITEM_HEIGHT);
    return Math.max(0, Math.min(NUMBERS.length - 1, idx));
  });

  const snapTo = useCallback(
    (targetOffset: number) => {
      const idx = Math.round(-targetOffset / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(NUMBERS.length - 1, idx));
      const snapped = -clamped * ITEM_HEIGHT;
      animate(offsetY, snapped, { type: "spring", stiffness: 300, damping: 30 });
      onChange(NUMBERS[clamped]);
    },
    [offsetY, onChange]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
    startOffset.current = offsetY.get();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientY - startY.current;
    const newOffset = startOffset.current + delta;
    const maxOffset = 0;
    const minOffset = -(NUMBERS.length - 1) * ITEM_HEIGHT;
    offsetY.set(Math.max(minOffset, Math.min(maxOffset, newOffset)));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    snapTo(offsetY.get());
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newOffset = offsetY.get() - Math.sign(e.deltaY) * ITEM_HEIGHT;
    snapTo(newOffset);
  };

  return (
    <div
      className="relative select-none overflow-hidden"
      style={{ height: ITEM_HEIGHT * 5, cursor: isDragging ? "grabbing" : "grab" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      ref={containerRef}
    >
      {/* Mask fade top/bottom */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 20%, transparent 80%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 20%, transparent 80%, black 100%)",
          background: "linear-gradient(to bottom, rgba(13,10,8,0.95) 0%, transparent 25%, transparent 75%, rgba(13,10,8,0.95) 100%)",
        }}
      />

      {/* Selection highlight */}
      <div
        className="absolute left-0 right-0 z-0 pointer-events-none"
        style={{
          top: "50%",
          height: ITEM_HEIGHT,
          transform: "translateY(-50%)",
          background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(242,196,206,0.08), rgba(201,168,76,0.12))",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: 16,
        }}
      />

      {/* Numbers */}
      <motion.div
        style={{ y: offsetY, paddingTop: ITEM_HEIGHT * 2 }}
        className="flex flex-col items-center"
      >
        {NUMBERS.map((num, idx) => (
          <NumberItem key={num} num={num} index={idx} offsetY={offsetY} />
        ))}
      </motion.div>
    </div>
  );
}

function NumberItem({
  num,
  index,
  offsetY,
}: {
  num: number;
  index: number;
  offsetY: ReturnType<typeof useMotionValue<number>>;
}) {
  const centerPosition = -index * ITEM_HEIGHT;
  const distance = useTransform(offsetY, (v) => Math.abs(v - centerPosition));
  const scale = useTransform(distance, [0, ITEM_HEIGHT, ITEM_HEIGHT * 2], [1.5, 1, 0.7]);
  const opacity = useTransform(distance, [0, ITEM_HEIGHT, ITEM_HEIGHT * 2], [1, 0.5, 0.25]);
  const blurPx = useTransform(distance, [0, ITEM_HEIGHT, ITEM_HEIGHT * 2], [0, 2, 4]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const color = useTransform(
    distance,
    [0, ITEM_HEIGHT, ITEM_HEIGHT * 2],
    ["#f5e6c8", "#c9a84c80", "#ffffff30"]
  );

  return (
    <motion.div
      style={{ height: ITEM_HEIGHT, scale, opacity, filter, color }}
      className="flex items-center justify-center w-full font-serif-fancy text-4xl font-light"
    >
      {num}
    </motion.div>
  );
}

export default function GuestCountPage({
  onConfirm,
}: {
  onConfirm: (count: number) => void;
}) {
  const [guestCount, setGuestCount] = useState(2);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Save the guest count to Supabase
      const { error } = await supabase
        .from('rsvps')
        .insert([{ guest_count: guestCount }]);
        
      if (error) {
        console.error("Error saving to Supabase:", error.message);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
    
    // Add a tiny delay for UX so the loading animation is visible
    await new Promise((r) => setTimeout(r, 800));
    onConfirm(guestCount);
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
    hidden: {},
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div
      className="min-h-dvh w-full flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <motion.div
        className="glass-card rounded-3xl w-full max-w-md mx-auto overflow-hidden"
        style={{ boxShadow: "0 0 60px rgba(201,168,76,0.08), 0 30px 60px rgba(0,0,0,0.4)" }}
      >
        <div className="px-8 py-12 md:px-12 md:py-14">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center gap-6"
          >
            {/* Icon */}
            <motion.div
              variants={fadeUp}
              className="w-16 h-16 rounded-full glass flex items-center justify-center"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-3xl">🥂</span>
            </motion.div>

            {/* Title */}
            <motion.div variants={fadeUp}>
              <h2 className="font-serif-fancy text-3xl md:text-4xl text-gold-gradient font-light">
                How Many Guests?
              </h2>
              <p className="font-sans-clean text-amber-100/50 text-sm mt-2 tracking-wide">
                Select the number of guests attending
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="w-full">
              <FloralDivider />
            </motion.div>

            {/* iOS-style wheel picker */}
            <motion.div variants={fadeUp} className="w-full relative">
              {/* Left/Right glow lines */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent rounded-full" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent rounded-full" />
              <WheelPicker value={guestCount} onChange={setGuestCount} />
            </motion.div>

            {/* Guest label */}
            <motion.p
              variants={fadeUp}
              className="font-sans-clean text-amber-200/60 text-sm tracking-widest uppercase"
            >
              {guestCount === 1 ? "Guest" : "Guests"} Attending
            </motion.p>

            <motion.div variants={fadeUp} className="w-full">
              <FloralDivider />
            </motion.div>

            {/* Confirm button */}
            <motion.button
              variants={fadeUp}
              onClick={handleConfirm}
              disabled={loading}
              whileHover={!loading ? { scale: 1.04, boxShadow: "0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(201,168,76,0.2)" } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="btn-premium w-full py-4 rounded-2xl font-sans-clean text-sm tracking-widest uppercase relative overflow-hidden"
              style={{
                background: loading
                  ? "rgba(201,168,76,0.15)"
                  : "linear-gradient(135deg, rgba(201,168,76,0.4) 0%, rgba(245,230,200,0.2) 50%, rgba(201,168,76,0.4) 100%)",
                border: "1px solid rgba(201,168,76,0.4)",
                color: "#f5e6c8",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <motion.div
                    className="w-4 h-4 border-2 border-amber-300/30 border-t-amber-300 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Confirming...
                </span>
              ) : (
                <span>Confirm Attendance ✦</span>
              )}
              {/* Shimmer */}
              {!loading && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                  }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
