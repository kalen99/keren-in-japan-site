"use client";

import React, { useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";

export function PassportStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Do you have a foreign passport?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("hasNonIsraeliPassport", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("hasNonIsraeliPassport", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}

export function PassportCountryStep() {
  const { updateProfile } = useQuiz();
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      updateProfile("passportCountry", value.trim());
    }
  };

  return (
    <QuestionStep title="Which country issued your passport?">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="passportCountry" className="sr-only">
          Passport-issuing country
        </label>
        <input
          id="passportCountry"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. UK, Germany, Australia, Israel..."
          autoComplete="country-name"
          className="w-full py-3 px-4 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={() => updateProfile("passportCountry", "SKIP")}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"
        >
          Skip
        </button>
      </form>
    </QuestionStep>
  );
}
