"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { getProgressPercentage } from "@/lib/flowLogic";

export function JourneyProgressBar() {
  const { profile } = useQuiz();
  const progress = getProgressPercentage(profile);

  return (
    <div className="w-full max-w-lg mx-auto mb-8 px-2">
      <div className="relative flex items-center gap-2">
        {/* Israel flag - home base */}
        <img
          src="https://flagcdn.com/w40/il.png"
          alt="Israel flag"
          className="flex-shrink-0 w-8 h-6 object-cover rounded drop-shadow-sm border border-gray-200"
          title="Israel"
        />

        {/* Silver track - rail from Israel to Japan */}
        <div
          className="flex-1 relative h-4 bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 rounded-full shadow-inner border border-slate-600/50 overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Journey to Japan progress"
        >
          {/* Deep red progress fill - follows the train */}
          <div
            className="absolute inset-y-0 left-0 rounded-l-full bg-red-900 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Shinkansen - progress marker (clamped so it stays visible) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-10 overflow-hidden"
            style={{
              left: `${Math.max(5, Math.min(95, progress))}%`,
              height: "1.25rem",
            }}
            title={`${progress}%`}
          >
            <span className="text-xl drop-shadow-lg inline-block scale-x-[-1] leading-none" role="img" aria-label="Bullet train">
              🚅
            </span>
          </div>
        </div>

        {/* Torii gate - Japan */}
        <div
          className="flex-shrink-0 text-3xl drop-shadow-sm"
          title="Japan"
          role="img"
          aria-label="Torii gate"
        >
          ⛩️
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-1.5">
        {progress}% — Journey to Japan
      </p>
    </div>
  );
}
