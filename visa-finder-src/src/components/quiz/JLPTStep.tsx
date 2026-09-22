"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";
import type { JLPTLevel } from "@/types/quiz";

const LEVELS: JLPTLevel[] = ["N1", "N2", "N3", "N4", "N5"];

export function JLPTStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="What is your JLPT level?">
      <div className="flex flex-col gap-3">
        {LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => updateProfile("jlptLevel", level)}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {level}
          </button>
        ))}
      </div>
    </QuestionStep>
  );
}
