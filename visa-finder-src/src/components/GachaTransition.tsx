"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface GachaTransitionProps {
  children: React.ReactNode;
  onResultRevealed?: () => void;
}

const CAPSULE_COLORS = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
];

export function GachaTransition({ children, onResultRevealed }: GachaTransitionProps) {
  const [phase, setPhase] = useState<"coin" | "gacha" | "burst" | "result">("coin");
  // The gacha/burst sequence below is several seconds of animation stitched
  // together with hardcoded delays and a couple of plain setTimeout calls,
  // which MotionConfig's reducedMotion="user" can't fully collapse. When the
  // visitor prefers reduced motion, skip straight from the coin click to the
  // result instead (WCAG 2.2.2 / 2.3.3).
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh] px-4">
      <AnimatePresence mode="wait">
        {phase === "coin" && (
          <ClickableCoin
            key="coin"
            onInsertComplete={() => setPhase(prefersReducedMotion ? "result" : "gacha")}
          />
        )}
        {phase === "gacha" && (
          <GachaMachine
            key="gacha"
            onComplete={() => setPhase("burst")}
          />
        )}
        {phase === "burst" && (
          <motion.div
            key="burst"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onAnimationComplete={() => setPhase("result")}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
          >
            <div className="w-16 h-24 rounded-lg bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 shadow-lg border-2 border-amber-700" />
          </motion.div>
        )}
        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0.6, scale: 0.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 24,
            }}
            onAnimationComplete={onResultRevealed}
            className="w-full flex justify-center"
            style={{ transformOrigin: "center center" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ClickableCoin({ onInsertComplete }: { onInsertComplete: () => void }) {
  const [state, setState] = useState<"idle" | "flipping" | "inserting">("idle");

  const handleClick = () => {
    if (state !== "idle") return;
    setState("flipping");
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[50vh] w-full"
      style={{ perspective: 800 }}
    >
      {/* Gacha machine in background (faded) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: state === "inserting" ? 1 : 0.35 }}
        transition={{ duration: 0.3 }}
      >
        <GachaMachineBody />
      </motion.div>

      {/* Large clickable coin - center of screen */}
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={state !== "idle"}
        className="relative z-20 cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400/50 rounded-full disabled:cursor-not-allowed"
        initial={false}
        animate={
          state === "flipping"
            ? { rotateY: 180, scale: 1 }
            : state === "inserting"
              ? {
                  x: -140,
                  y: 50,
                  scale: 0.22,
                  rotateY: 0,
                  opacity: 0.95,
                }
              : { scale: 1 }
        }
        transition={
          state === "flipping"
            ? { duration: 0.45, ease: "easeInOut" }
            : state === "inserting"
              ? { duration: 0.7, ease: "easeIn" }
              : {}
        }
        onAnimationComplete={() => {
          if (state === "flipping") {
            setState("inserting");
          } else if (state === "inserting") {
            onInsertComplete();
          }
        }}
        style={{
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="w-36 h-36 rounded-full bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-600 shadow-xl border-4 border-amber-700 flex items-center justify-center"
          style={{
            boxShadow:
              "0 8px 32px rgba(251,191,36,0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
          }}
        >
          <span
            className="text-base font-bold text-amber-900 text-center px-3 leading-tight"
            style={{ backfaceVisibility: "hidden" }}
          >
            See Result
          </span>
        </motion.div>
      </motion.button>
    </div>
  );
}

function GachaMachineBody() {
  return (
    <div className="relative">
      <div className="w-48 h-24 bg-red-600 rounded-b-2xl border-4 border-red-800 shadow-lg flex items-center justify-center">
        <div className="w-32 h-3 bg-red-800 rounded-full" />
      </div>
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-40 h-32">
        <div
          className="absolute inset-0 rounded-t-2xl border-4 border-gray-400 bg-white/30 backdrop-blur-sm overflow-hidden"
          style={{ boxShadow: "inset 0 0 20px rgba(255,255,255,0.5)" }}
        >
          <Capsules />
        </div>
      </div>
      <div className="absolute -right-2 top-8 w-8 h-12 flex justify-center items-start">
        <div className="w-3 h-10 bg-gray-600 rounded-full" />
        <div className="absolute -top-1 w-6 h-4 bg-gray-500 rounded-full -rotate-45" />
      </div>
    </div>
  );
}

function GachaMachine({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Coin slot - coin already inserted */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-20">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 shadow-md border-2 border-amber-700 opacity-80" />
      </div>

      {/* Gacha machine container */}
      <div className="relative">
        {/* Hidden chute (slot where capsule drops from) */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-6 bg-gray-800 rounded-t border-2 border-gray-600 z-10" />

        {/* Red base */}
        <div className="w-48 h-24 bg-red-600 rounded-b-2xl border-4 border-red-800 shadow-lg flex items-center justify-center">
          <div className="w-32 h-3 bg-red-800 rounded-full" />
        </div>

        {/* Glass top with capsules */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-40 h-32">
          <motion.div
            className="absolute inset-0 rounded-t-2xl border-4 border-gray-400 bg-white/30 backdrop-blur-sm overflow-hidden"
            style={{ boxShadow: "inset 0 0 20px rgba(255,255,255,0.5)" }}
            animate={{ rotate: [0, -2, 2, -2, 2, 0] }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: "easeInOut",
            }}
          >
            <Capsules />
          </motion.div>
        </div>

        {/* Crank */}
        <motion.div
          className="absolute -right-2 top-8 w-8 h-12 flex justify-center items-start"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: "easeInOut",
          }}
        >
          <div className="w-3 h-10 bg-gray-600 rounded-full" />
          <div className="absolute -top-1 w-6 h-4 bg-gray-500 rounded-full -rotate-45" />
        </motion.div>
      </div>

      {/* Golden capsule - drops from chute */}
      <GoldenCapsuleDrop onComplete={onComplete} />
    </motion.div>
  );
}

function Capsules() {
  return (
    <div className="absolute inset-2 flex flex-wrap gap-1 justify-center items-center p-2">
      {CAPSULE_COLORS.map((color, i) => (
        <motion.div
          key={i}
          className={`w-4 h-6 rounded ${color} border border-black/20`}
          animate={{
            x: [0, -3, 3, -2, 2, 0],
            y: [0, 2, -2, 1, -1, 0],
          }}
          transition={{
            duration: 0.6,
            delay: 0.6 + i * 0.05,
            repeat: 1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GoldenCapsuleDrop({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30">
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.9,
          delay: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onAnimationComplete={() => {
          setTimeout(onComplete, 600);
        }}
      >
        <motion.div
          className="w-16 h-24 rounded-lg bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 shadow-xl border-2 border-amber-700 flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 10px 40px rgba(251,191,36,0.5)",
              "0 10px 60px rgba(251,191,36,0.8)",
              "0 10px 40px rgba(251,191,36,0.5)",
            ],
          }}
          transition={{
            duration: 0.5,
            delay: 2,
            repeat: Infinity,
            repeatDelay: 0.3,
          }}
        >
          <span className="text-2xl">✨</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
