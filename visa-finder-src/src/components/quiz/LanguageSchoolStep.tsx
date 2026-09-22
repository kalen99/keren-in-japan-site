"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";

export function LanguageSchoolStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Do you plan to pursue language school in Japan?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("planToLanguageSchool", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("planToLanguageSchool", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}
