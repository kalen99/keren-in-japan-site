"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";

export function PartnerStatusStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Relationship status">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("partnerStatus", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          In Relationship
        </button>
        <button
          onClick={() => updateProfile("partnerStatus", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Single
        </button>
      </div>
    </QuestionStep>
  );
}

export function PartnerJapaneseStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Is your partner Japanese?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("partnerJapanese", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("partnerJapanese", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}

export function PartnerDegreeStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Does your partner have a Bachelor's Degree or high income?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("partnerDegreeOrHighIncome", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("partnerDegreeOrHighIncome", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}
