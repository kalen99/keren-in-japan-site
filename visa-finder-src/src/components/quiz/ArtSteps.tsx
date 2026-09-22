"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";

export function ArtStudentStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Are you coming to study a traditional art (Karate, Ikebana)?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("isArtStudent", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("isArtStudent", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}

export function ArtSponsorStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Do you have a specific teacher/organization in Japan to sponsor you?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("hasArtSponsor", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("hasArtSponsor", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}

export function ArtSavingsStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Can you live without working a single day? (Savings &gt; ₪75k)">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("savingsForArt", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("savingsForArt", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}
