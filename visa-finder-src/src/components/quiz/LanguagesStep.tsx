"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";
import type { UserLanguage } from "@/types/quiz";

export function LanguagesStep() {
  const { profile, updateProfile } = useQuiz();
  const selected = profile.languages ?? [];

  const toggle = (lang: UserLanguage) => {
    const next = selected.includes(lang)
      ? selected.filter((l) => l !== lang)
      : [...selected, lang];
    updateProfile("languages", next.length ? next : []);
  };

  return (
    <QuestionStep title="Which languages do you speak?">
      <div className="flex flex-col gap-3">
        {(["english", "japanese", "other"] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => toggle(lang)}
            aria-pressed={selected.includes(lang)}
            className={`w-full py-3 px-4 border rounded-lg capitalize ${
              selected.includes(lang)
                ? "border-gray-900 bg-gray-100"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {lang}
          </button>
        ))}
        <button
          onClick={() => updateProfile("languages", selected)}
          disabled={selected.length === 0}
          className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          Continue
        </button>
        {selected.length === 0 && (
          <p className="text-xs text-gray-500 mt-1">Select at least one language to continue</p>
        )}
      </div>
    </QuestionStep>
  );
}
