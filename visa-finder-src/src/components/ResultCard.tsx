"use client";

import React from "react";
import { Stamp } from "./Stamp";

interface ResultCardProps {
  children: React.ReactNode;
  isHazure?: boolean;
}

function Watermark() {
  return (
    <img
      src="/keren-watermark.png"
      alt=""
      className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none"
      aria-hidden
    />
  );
}

export function ResultCard({ children, isHazure }: ResultCardProps) {
  return (
    <div className="relative max-w-md w-full rounded-xl border-2 border-dashed border-gray-400 bg-[#FDFCF0] p-8 overflow-hidden">
      <Watermark />
      <div className="relative z-10">
        <Stamp variant={isHazure ? "hazure" : "permitted"} />
        {children}
      </div>
    </div>
  );
}
