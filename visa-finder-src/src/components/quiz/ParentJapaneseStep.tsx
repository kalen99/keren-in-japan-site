"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";

export function ParentJapaneseStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Is either of your parents Japanese?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("parentJapanese", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("parentJapanese", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}
