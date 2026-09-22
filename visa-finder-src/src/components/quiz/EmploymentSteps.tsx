"use client";

import React, { useState, useEffect } from "react";
import { SLIDER_CONFIG } from "@/lib/visaData";
import { createPortal } from "react-dom";
import { useQuiz } from "@/context/QuizContext";
import { QuestionStep } from "../QuestionStep";
import { GoldSparkles } from "../GoldSparkles";

export function EmployedStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Are you employed?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("isEmployed", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("isEmployed", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}

export function IncomeStep() {
  const { updateProfile } = useQuiz();
  const [value, setValue] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile("currentIncome", value);
  };

  const { min, max, step } = SLIDER_CONFIG.income;
  const fillPercent = (value / max) * 100;
  const intensity = value / max;
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
      <QuestionStep title={`What is your annual income? (₪${min.toLocaleString()} - ₪${max.toLocaleString()})`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative h-8 flex items-center overflow-hidden">
            {/* Track background - cream white */}
            <div className="absolute inset-x-0 h-3 rounded-full bg-[#FFF8E7] border border-amber-200/50" />
            {/* Fill - cream to gold gradient, grows with value */}
            <div
              className="absolute left-0 h-3 rounded-l-full transition-all duration-300 ease-out"
              style={{
                width: `${fillPercent}%`,
                background: "linear-gradient(to right, #FFF8E7 0%, #FFD700 100%)",
              }}
            />
            <label htmlFor="currentIncome" className="sr-only">
              Annual income in shekels
            </label>
            <input
              id="currentIncome"
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              aria-valuetext={`₪${value.toLocaleString()}`}
              className="absolute inset-0 w-full h-full cursor-pointer z-10 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-amber-700 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-3 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-amber-500 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-amber-700 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-track]:bg-transparent"
            />
          </div>
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

export function RemoteStep() {
  const { updateProfile } = useQuiz();

  return (
    <QuestionStep title="Can you work remotely?">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => updateProfile("remoteWork", true)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Yes
        </button>
        <button
          onClick={() => updateProfile("remoteWork", false)}
          className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          No
        </button>
      </div>
    </QuestionStep>
  );
}
