"use client";

import React, { useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";

export function AgeStep() {
  const { updateProfile } = useQuiz();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0 && num <= 120) {
      updateProfile("userAge", num);
    }
  };

  return (
    <QuestionStep title="How old are you?">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="userAge" className="sr-only">
          Your age
        </label>
        <input
          id="userAge"
          type="number"
          inputMode="numeric"
          min={0}
          max={120}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your age"
          required
          aria-describedby="userAgeHint"
          className="w-full py-3 px-4 border border-gray-300 rounded-lg text-center text-lg"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
        <p id="userAgeHint" className="text-xs text-gray-500 mt-1 text-center" aria-live="polite">
          {!value.trim() ? "Enter your age to continue" : ""}
        </p>
      </form>
    </QuestionStep>
  );
}
