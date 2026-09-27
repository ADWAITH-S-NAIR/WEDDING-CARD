"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy load heavy components
const LoadingScreen = dynamic(() => import("./components/LoadingScreen"), { ssr: false });
const InvitationPage = dynamic(() => import("./components/InvitationPage"), { ssr: false });
const GuestCountPage = dynamic(() => import("./components/GuestCountPage"), { ssr: false });
const ThankYouPage = dynamic(() => import("./components/ThankYouPage"), { ssr: false });
const Particles = dynamic(() => import("./components/Particles"), { ssr: false });
const MusicButton = dynamic(() => import("./components/MusicButton"), { ssr: false });

type Page = "loading" | "invitation" | "guest-count" | "thank-you";

export default function WeddingInvitation() {
  const [page, setPage] = useState<Page>("loading");
  const [guestCount, setGuestCount] = useState(2);

  const handleConfirmAttendance = (count: number) => {
    setGuestCount(count);
    setPage("thank-you");
  };

  return (
    <main className="relative min-h-dvh bg-dark-romantic overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(45,106,79,0.06) 0%, transparent 70%)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(242,196,206,0.04) 0%, transparent 70%)" }}
          animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
      </div>

      {/* Particle field (always visible after loading) */}
      {page !== "loading" && <Particles count={50} />}

      {/* Page state machine */}
      <AnimatePresence mode="wait">
        {page === "loading" && (
          <LoadingScreen key="loading" onComplete={() => setPage("invitation")} />
        )}

        {page === "invitation" && (
          <motion.div key="invitation" className="min-h-dvh">
            <InvitationPage onConfirm={() => setPage("guest-count")} />
          </motion.div>
        )}

        {page === "guest-count" && (
          <motion.div key="guest-count" className="min-h-dvh">
            <GuestCountPage onConfirm={handleConfirmAttendance} />
          </motion.div>
        )}

        {page === "thank-you" && (
          <motion.div key="thank-you" className="min-h-dvh">
            <ThankYouPage guestCount={guestCount} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent controls */}
      {page !== "loading" && <MusicButton />}

      {/* Back nav (invitation → loading screen restart) */}
      {page === "guest-count" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setPage("invitation")}
          className="fixed top-6 left-6 z-50 w-10 h-10 rounded-full glass flex items-center justify-center text-amber-300/70 hover:text-amber-200 transition-colors"
          aria-label="Go back"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}
    </main>
  );
}
