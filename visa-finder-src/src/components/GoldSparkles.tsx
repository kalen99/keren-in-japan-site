"use client";

import React, { useMemo } from "react";

const SPARKLE_POSITIONS = [
  { top: "12%", left: "8%" },
  { top: "25%", left: "85%" },
  { top: "40%", left: "15%" },
  { top: "55%", left: "92%" },
  { top: "70%", left: "5%" },
  { top: "18%", left: "45%" },
  { top: "35%", left: "72%" },
  { top: "62%", left: "28%" },
  { top: "48%", left: "55%" },
  { top: "78%", left: "65%" },
  { top: "8%", left: "62%" },
  { top: "85%", left: "38%" },
  { top: "22%", left: "22%" },
  { top: "58%", left: "8%" },
  { top: "72%", left: "88%" },
  { top: "42%", left: "38%" },
  { top: "15%", left: "78%" },
  { top: "88%", left: "15%" },
  { top: "5%", left: "35%" },
  { top: "95%", left: "72%" },
  { top: "30%", left: "55%" },
  { top: "65%", left: "78%" },
  { top: "50%", left: "12%" },
  { top: "38%", left: "92%" },
  { top: "75%", left: "45%" },
  { top: "10%", left: "92%" },
  { top: "92%", left: "55%" },
  { top: "45%", left: "82%" },
  { top: "28%", left: "8%" },
  { top: "82%", left: "25%" },
];

interface GoldSparklesProps {
  intensity: number; // 0 to 1
}

export function GoldSparkles({ intensity }: GoldSparklesProps) {
  const visibleCount = useMemo(() => {
    if (intensity < 0.15) return 0;
    return Math.min(
      SPARKLE_POSITIONS.length,
      Math.floor(3 + intensity * SPARKLE_POSITIONS.length * 0.9)
    );
  }, [intensity]);

  if (visibleCount === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {SPARKLE_POSITIONS.slice(0, visibleCount).map((pos, i) => {
        const symbols = ["✦", "✧", "★"];
        return (
          <div
            key={i}
            className="absolute animate-[sparkle-twinkle_2s_ease-in-out_infinite]"
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: `${(i * 0.12) % 2}s`,
            }}
          >
            <span
              className="drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]"
              style={{
                fontSize: `clamp(${12 + intensity * 8}px, 2.5vw, ${20 + intensity * 12}px)`,
                color: intensity > 0.6 ? "rgba(255, 255, 255, 0.95)" : "rgba(253, 230, 138, 0.9)",
              }}
            >
              {symbols[i % symbols.length]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
