"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useQuiz } from "@/context/QuizContext";
import {
  getRandomCelebrity,
  getRandomCelebrityFromEitherDeck,
  type CelebrityEntry,
} from "@/lib/celebrities";

type UserGender = "female" | "male" | "rather-not-answer";

const HEARTS = ["💖", "💕", "💗"];

function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl opacity-40"
          style={{
            left: `${10 + (i * 7) % 80}%`,
            top: `${5 + (i * 11) % 90}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {HEARTS[i % HEARTS.length]}
        </motion.span>
      ))}
    </div>
  );
}

function CelebrityCard({
  celebrity,
  onYes,
  onNo,
}: {
  celebrity: CelebrityEntry;
  onYes: () => void;
  onNo: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      <motion.div
        className="relative w-full aspect-[9/16] max-h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white/80"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.5)",
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={celebrity.image}
            alt={celebrity.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect fill='%23e5e7eb' width='200' height='300'/%3E%3Ctext x='50%25' y='50%25' fill='%239ca3af' font-size='14' text-anchor='middle' dy='.3em'%3E%F0%9F%91%A4%3C/text%3E%3C/svg%3E";
            }}
          />
        </motion.div>
      </motion.div>
      <p className="text-lg font-medium text-gray-800">Be honest... is this your taste?</p>
      <div className="flex gap-3 w-full">
        <button
          onClick={onYes}
          className="flex-1 py-3 px-4 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors shadow-lg"
        >
          Yes
        </button>
        <button
          onClick={onNo}
          className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-300 text-gray-600 font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          No
        </button>
      </div>
    </div>
  );
}

export function SpouseTasteTestStep() {
  const { updateProfile } = useQuiz();
  const [phase, setPhase] = useState<"gender" | "show">("gender");
  const [userGender, setUserGender] = useState<UserGender | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const celebrity = useMemo(() => {
    if (!userGender) return null;
    if (userGender === "female") return getRandomCelebrity("male");
    if (userGender === "male") return getRandomCelebrity("female");
    return getRandomCelebrityFromEitherDeck();
  }, [userGender]);

  // This screen doesn't use the shared QuestionStep wrapper, so it needs its
  // own focus move when the phase changes (see QuestionStep.tsx for why).
  useEffect(() => {
    headingRef.current?.focus();
  }, [phase]);

  const handleGenderPick = (g: UserGender) => {
    setUserGender(g);
    setPhase("show");
  };

  if (phase === "gender") {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #fce7f3 100%)",
        }}
      >
        <FloatingHearts />
        <div className="relative z-10 text-center">
          <h2 ref={headingRef} tabIndex={-1} className="text-xl font-medium text-gray-800 mb-6 focus:outline-none">
            Spouse Taste Test
          </h2>
          <p className="text-gray-600 mb-6">What is your gender?</p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <button
              onClick={() => handleGenderPick("female")}
              className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 hover:border-pink-300 hover:bg-pink-50 transition-colors font-medium"
            >
              Female
            </button>
            <button
              onClick={() => handleGenderPick("male")}
              className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 hover:border-pink-300 hover:bg-pink-50 transition-colors font-medium"
            >
              Male
            </button>
            <button
              onClick={() => handleGenderPick("rather-not-answer")}
              className="w-full py-3 px-4 rounded-xl border-2 border-gray-300 hover:border-pink-300 hover:bg-pink-50 transition-colors font-medium"
            >
              Rather not answer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!celebrity) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 gap-4"
        style={{
          background: "linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #fce7f3 100%)",
        }}
      >
        <p className="text-gray-600 text-center">
          Add celebrities to src/lib/celebrities.ts to enable the taste test.
        </p>
        <button
          onClick={() => updateProfile("spouseHailMary", false)}
          className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-medium hover:bg-gray-50"
        >
          Skip to result
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 50%, #fce7f3 100%)",
      }}
    >
      <FloatingHearts />
      <div className="relative z-10">
        <h2 ref={headingRef} tabIndex={-1} className="text-xl font-medium text-gray-800 text-center mb-6 focus:outline-none">
          Spouse Taste Test
        </h2>
        <CelebrityCard
          celebrity={celebrity}
          onYes={() => updateProfile("spouseHailMary", true)}
          onNo={() => updateProfile("spouseHailMary", false)}
        />
      </div>
    </div>
  );
}
