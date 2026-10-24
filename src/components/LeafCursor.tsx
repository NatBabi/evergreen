"use client";

import React, { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export function LeafCursor() {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine pointer and no reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !isFinePointer) return;

    const handlePointerMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const isOverPlantCard = target?.closest("#plants .group") || target?.closest("#companion .group");

      if (isOverPlantCard) {
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed pointer-events-none z-[150] transition-opacity duration-200"
      style={{
        left: `${pos.x + 16}px`,
        top: `${pos.y + 16}px`,
      }}
    >
      <div className="p-2 rounded-full bg-leaf text-ivory shadow-md animate-bounce scale-90">
        <Leaf className="w-4 h-4" />
      </div>
    </div>
  );
}
