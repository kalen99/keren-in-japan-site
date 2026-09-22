"use client";

import React, { useEffect, useId, useRef } from "react";

interface QuestionStepProps {
  title: string;
  children: React.ReactNode;
  wrapperStyle?: React.CSSProperties;
  wrapperClassName?: string;
}

export function QuestionStep({ title, children, wrapperStyle, wrapperClassName }: QuestionStepProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingId = useId();

  // Move focus to the new question whenever it appears. This is a single-page
  // quiz: the whole screen swaps out on every answer with no page navigation,
  // so without this a screen reader or keyboard user gets no signal that
  // anything changed (WCAG 2.4.3 / 4.1.3-equivalent for in-page step changes).
  useEffect(() => {
    headingRef.current?.focus();
  }, [title]);

  return (
    <div
      className={`relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-4 transition-all duration-500 ${wrapperClassName ?? ""}`}
      style={wrapperStyle}
    >
      <h2
        ref={headingRef}
        id={headingId}
        tabIndex={-1}
        className="text-xl font-medium text-center mb-8 max-w-md focus:outline-none"
      >
        {title}
      </h2>
      <div className="w-full max-w-sm" role="group" aria-labelledby={headingId}>
        {children}
      </div>
    </div>
  );
}
