"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";

const CELEBRITIES = ["🎌", "👤", "🌟"];

export function SpouseHailMaryStep() {
  const { updateProfile } = useQuiz();
  const celebrity = CELEBRITIES[Math.floor(Math.random() * CELEBRITIES.length)];

  return (
    <QuestionStep title="Searching for a romantic match... Is this your type?">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center text-6xl border-2 border-rose-200">
          {celebrity}
        </div>
        <p className="text-sm text-gray-500">(Celebrity placeholder)</p>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => updateProfile("spouseHailMary", true)}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Yes
          </button>
          <button
            onClick={() => updateProfile("spouseHailMary", false)}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            No
          </button>
        </div>
      </div>
    </QuestionStep>
  );
}
