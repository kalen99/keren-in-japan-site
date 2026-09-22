"use client";

import React from "react";
import confetti from "canvas-confetti";
import { useQuiz } from "@/context/QuizContext";
import { GachaTransition } from "./GachaTransition";
import { ResultCard } from "./ResultCard";
import {
  VISA_DATABASE_2026,
  VISA_RESULT_TO_DB_KEY,
} from "@/lib/visaData";
import type { VisaResult } from "@/types/quiz";

const RESULT_CONFIG: Record<
  Exclude<VisaResult, null>,
  { title: string; subtitle: string; isHazure?: boolean }
> = {
  "child-of-japanese-national": {
    title: "Child of Japanese National",
    subtitle: "You may be eligible for a visa as a child of a Japanese national.",
  },
  "working-holiday-visa": {
    title: "Working Holiday Visa",
    subtitle: "You qualify for a Working Holiday Visa based on your passport and age (18–30).",
  },
  "spouse-visa": {
    title: "Spouse Visa",
    subtitle: "You may be eligible for a Spouse Visa.",
  },
  "dependent-visa": {
    title: "Dependent Visa",
    subtitle: "Your partner's status may allow you to apply as a dependent.",
  },
  "business-manager-visa": {
    title: "Business Manager Visa",
    subtitle: "Your investment (₪750k+), management experience, and N2 Japanese qualify you.",
  },
  "startup-visa": {
    title: "Startup Visa",
    subtitle: "2-Year Launchpad in Tokyo or Fukuoka.",
  },
  "digital-nomad-visa": {
    title: "Digital Nomad Visa",
    subtitle: "6 months, no renewal. Your remote work and income (₪240k+) qualify you.",
  },
  "work-visa": {
    title: "Work Visa (Engineer / Humanities)",
    subtitle: "Your experience and company affiliation with Japan qualify you.",
  },
  "student-visa": {
    title: "Student Visa (MEXT)",
    subtitle: "Consider applying for the MEXT scholarship to study for a Master's in Japan.",
  },
  "language-school-visa": {
    title: "Student Visa",
    subtitle: "Language school in Japan qualifies you for a Student Visa.",
  },
  "cultural-activities-visa": {
    title: "Cultural Activities Visa",
    subtitle: "You qualify to study traditional arts (Karate, Ikebana) in Japan.",
  },
  "specified-skilled-worker": {
    title: "Specified Skilled Worker (SSW)",
    subtitle: "You may qualify for Nursing, Construction, or Food Service roles.",
  },
  "tourist-visa-hazure": {
    title: "Tourist Visa",
    subtitle: "For now, a tourist visa is your best option. Good luck!",
    isHazure: true,
  },
  "spouse-visa-theoretical": {
    title: "Spouse Visa (Theoretical)",
    subtitle: "Your taste test says yes! In theory, a spouse visa could work—if you find the one.",
  },
  "90-day-tourist-visa": {
    title: "90-Day Tourist Visa",
    subtitle: "No professional visa this time. Enjoy 90 days in Japan as a tourist!",
    isHazure: true,
  },
};

const EMOJI_SHAPES = ["🍙", "🍣", "🌸"] as const;

function triggerEmojiConfetti() {
  const scalar = 2;
  const shapes = EMOJI_SHAPES.map((emoji) =>
    confetti.shapeFromText({ text: emoji, scalar })
  );
  confetti({
    particleCount: 60,
    spread: 100,
    origin: { x: 0.5, y: 0.6 },
    shapes,
    scalar,
    disableForReducedMotion: true,
  });
}

export function ResultScreen() {
  const { result, isShortcut, reset } = useQuiz();

  const handleResultRevealed = () => {
    const config = RESULT_CONFIG[result!];
    const isProfessional = !config.isHazure;
    if (isProfessional || isShortcut) {
      triggerEmojiConfetti();
    }
    // The result appears after a silent animated sequence (coin, gacha
    // machine, capsule burst) with nothing to announce along the way.
    // Move focus to the result heading now so screen reader and keyboard
    // users know the quiz is over and hear the outcome.
    document.getElementById("visaResultHeading")?.focus();
  };

  if (!result) return null;

  const config = RESULT_CONFIG[result];
  const dbKey = (VISA_RESULT_TO_DB_KEY as Record<string, string>)[result];
  const visaData = dbKey && dbKey in VISA_DATABASE_2026 ? VISA_DATABASE_2026[dbKey as keyof typeof VISA_DATABASE_2026] : null;

  const resultCard = (
    <ResultCard isHazure={config.isHazure}>
      <div className="text-center pt-10">
        {isShortcut && (
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-amber-400 text-amber-900 font-semibold text-sm">
            Shortcut Detected!
          </div>
        )}
        {visaData?.badge && (
          <div className="text-sm font-medium text-gray-500 mb-1">
            {visaData.badge}
          </div>
        )}
        <h2 id="visaResultHeading" tabIndex={-1} className="text-2xl font-semibold mb-2 focus:outline-none">
          {visaData?.title ?? config.title}
        </h2>
        {visaData?.japaneseTitle && (
          <p className="text-lg text-gray-600 mb-2">{visaData.japaneseTitle}</p>
        )}
        <p className="text-gray-700 mb-4">{config.subtitle}</p>
        {visaData && (
          <div className="text-left mb-4 p-4 bg-white/50 rounded-lg border border-gray-200">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Conditions:
            </p>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              {visaData.conditions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
            <p className="text-sm font-medium text-gray-600 mt-2">
              Stay limit: {visaData.stay_limit}
            </p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="/contact.html?service=Strategy%20Call%20(Visa)#form"
            className="relative overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-gray-900 font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            <span className="relative z-10">Book a Strategy Call</span>
            <span
              className="absolute inset-0 w-1/2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
                animation: "gold-sheen 3s ease-in-out infinite",
              }}
            />
          </a>
          <button
            onClick={reset}
            className="px-6 py-3 rounded-lg border-2 border-gray-400 text-gray-600 font-medium hover:border-gray-600 hover:text-gray-800 transition-colors"
          >
            Retry the Quest
          </button>
        </div>
      </div>
    </ResultCard>
  );

  return (
    <GachaTransition onResultRevealed={handleResultRevealed}>
      {resultCard}
    </GachaTransition>
  );
}
