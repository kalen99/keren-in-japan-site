"use client";

import React, { useState, useEffect } from "react";
import { SLIDER_CONFIG } from "@/lib/visaData";
import { createPortal } from "react-dom";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";
import { GoldSparkles } from "../GoldSparkles";

export function BusinessOwnerStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Are you a business owner?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("isBusinessOwner", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("isBusinessOwner", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}

export function ExpandToJapanStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Are you planning to expand your business to Japan?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("expandBusinessToJapan", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("expandBusinessToJapan", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}

export function InvestmentStep() {
  const { updateProfile } = useQuiz();
  const [value, setValue] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile("investmentAmount", value);
  };

  const intensity = value / SLIDER_CONFIG.investment.max;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.background = "transparent";
    return () => { document.body.style.background = ""; };
  }, []);

  const bgStyle: React.CSSProperties = {
    background: intensity > 0
      ? `linear-gradient(135deg, 
          rgba(255,248,231,${intensity}) 0%, 
          rgba(255,215,0,${intensity * 0.95}) 25%,
          rgba(255,193,37,${intensity * 0.9}) 50%,
          rgba(255,215,0,${intensity * 0.95}) 75%,
          rgba(255,248,231,${intensity}) 100%
        ), #fafafa`
      : "#fafafa",
  };

  return (
    <>
      {mounted &&
        createPortal(
          <div
            className="fixed inset-0 -z-10 pointer-events-none transition-all duration-500"
            style={bgStyle}
          >
            {intensity > 0.3 && (
              <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,215,0,0.12),transparent)] animate-[gold-sparkle_4s_ease-in-out_infinite]"
                aria-hidden
              />
            )}
            <GoldSparkles intensity={intensity} />
          </div>,
          document.body
        )}
      <QuestionStep title={`How much can you invest? (₪${SLIDER_CONFIG.investment.min.toLocaleString()} - ₪${SLIDER_CONFIG.investment.max.toLocaleString()}+)`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label htmlFor="investmentAmount" className="sr-only">
            Investment amount in shekels
          </label>
          <input
            id="investmentAmount"
            type="range"
            min={SLIDER_CONFIG.investment.min}
            max={SLIDER_CONFIG.investment.max}
            step={SLIDER_CONFIG.investment.step}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-valuetext={`₪${value.toLocaleString()}`}
            className="flex-1"
          />
          <span className="text-lg font-medium w-24" aria-hidden="true">₪{value.toLocaleString()}</span>
        </div>
        <button
          type="submit"
          className="relative z-20 w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          Continue
        </button>
      </form>
    </QuestionStep>
    </>
  );
}

export function StartupStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Are you a startup?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("isStartup", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("isStartup", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}

export function ManagementMastersStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Do you have 3 years of management experience or a Master's degree?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("hasManagementExpOrMasters", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("hasManagementExpOrMasters", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}
