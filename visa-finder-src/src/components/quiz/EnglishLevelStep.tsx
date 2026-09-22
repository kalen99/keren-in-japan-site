"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";
import type { EnglishLevel } from "@/types/quiz";

const LEVELS: EnglishLevel[] = ["native", "business", "casual", "can-speak-a-little"];

export function EnglishLevelStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="What is your level of English?">
      <div className="flex flex-col gap-3">
        {LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => updateProfile("englishLevel", level)}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 capitalize"
          >
            {level.replace(/-/g, " ")}
          </button>
        ))}
      </div>
    </QuestionStep>
  );
}
