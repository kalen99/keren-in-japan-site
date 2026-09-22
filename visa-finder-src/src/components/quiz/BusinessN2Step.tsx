"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";

export function BusinessN2Step() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Do you or a full-time employee have N2 Japanese?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("hasBusinessN2", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("hasBusinessN2", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}
