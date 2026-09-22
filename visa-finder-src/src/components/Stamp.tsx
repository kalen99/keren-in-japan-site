"use client";

import React from "react";
import { motion } from "framer-motion";

interface StampProps {
  variant?: "permitted" | "hazure";
}

export function Stamp({ variant = "permitted" }: StampProps) {
  const isHazure = variant === "hazure";
  const japaneseText = isHazure ? "不許可" : "許可";
  const englishText = isHazure ? "HAZURE" : "PERMITTED";

  return (
    <motion.div
      className="absolute top-4 right-4"
      initial={{ scale: 3 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.2,
      }}
    >
      <motion.svg
        viewBox="0 0 120 120"
        className="w-20 h-20"
        initial={{ x: 0, y: 0 }}
        animate={{
          x: [0, 2, -2, 2, -2, 0],
          y: [0, -2, 2, -2, 2, 0],
        }}
        transition={{
          duration: 0.12,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <circle
          cx="60"
          cy="60"
          r="55"
          fill="none"
          stroke="#b91c1c"
          strokeWidth="4"
        />
        <text
          x="60"
          y="52"
          textAnchor="middle"
          fill="#b91c1c"
          style={{ fontFamily: "serif", fontSize: isHazure ? 16 : 14, fontWeight: "bold" }}
        >
          {japaneseText}
        </text>
        <text
          x="60"
          y="72"
          textAnchor="middle"
          fill="#b91c1c"
          style={{ fontFamily: "sans-serif", fontSize: isHazure ? 11 : 10, fontWeight: "bold" }}
        >
          {englishText}
        </text>
      </motion.svg>
    </motion.div>
  );
}
