"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";

export function SpecialistStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Willing to work in Nursing, Construction, or Food Service?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("willingSpecialist", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("willingSpecialist", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}

export function N4Step() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Can you pass a basic Japanese test (N4)?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("canPassN4", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("canPassN4", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}
