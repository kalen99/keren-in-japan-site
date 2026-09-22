"use client";

import React from "react";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";
import type { DegreeType } from "@/types/quiz";

export function DegreeStep() {
  const { profile, updateProfile } = useQuiz();
  const selected = profile.degreeType;

  const select = (type: DegreeType) => {
    updateProfile("degreeType", type);
  };

  return (
    <QuestionStep title="Do you have any of the following?">
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => select("bachelor")}
          aria-pressed={selected === "bachelor"}
          className={`w-full py-3 px-4 border rounded-lg text-left ${
            selected === "bachelor"
              ? "border-gray-900 bg-gray-100"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          Bachelor&apos;s degree
        </button>
        <button
          type="button"
          onClick={() => select("10years")}
          aria-pressed={selected === "10years"}
          className={`w-full py-3 px-4 border rounded-lg text-left ${
            selected === "10years"
              ? "border-gray-900 bg-gray-100"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          10 years of experience
        </button>
        <button
          type="button"
          onClick={() => select("both")}
          aria-pressed={selected === "both"}
          className={`w-full py-3 px-4 border rounded-lg text-left ${
            selected === "both"
              ? "border-gray-900 bg-gray-100"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          Both
        </button>
        <button
          type="button"
          onClick={() => select("none")}
          aria-pressed={selected === "none"}
          className={`w-full py-3 px-4 border rounded-lg text-left ${
            selected === "none"
              ? "border-gray-900 bg-gray-100"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          Neither
        </button>
        <button
          onClick={() => selected && updateProfile("degreeType", selected)}
          disabled={selected === null}
          className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          Continue
        </button>
        {selected === null && (
          <p className="text-xs text-gray-500 mt-1">Select an option to continue</p>
        )}
      </div>
    </QuestionStep>
  );
}

export function ContinueToMasterStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Are you planning to continue to a Master's degree? (We can recommend MEXT scholarship for Student Visa)">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("continueToMaster", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("continueToMaster", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}

export function CompanyAffiliatedStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Do you work in a company affiliated with Japan?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("companyAffiliatedWithJapan", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("companyAffiliatedWithJapan", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}
