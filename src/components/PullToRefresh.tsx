"use client";

import { useRef, useState, useCallback, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/Toast";

type PullState = "idle" | "pulling" | "refreshing";

const THRESHOLD = 80;
const MAX_PULL = 120;

export default function PullToRefresh({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PullState>("idle");
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const pulling = useRef(false);
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (state === "refreshing") return;
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
        pulling.current = true;
      }
    },
    [state]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!pulling.current || state === "refreshing") return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta > 0) {
        const distance = Math.min(delta * 0.5, MAX_PULL);
        setPullDistance(distance);
        setState("pulling");
      } else {
        setPullDistance(0);
        setState("idle");
      }
    },
    [state]
  );

  const onTouchEnd = useCallback(async () => {
    if (!pulling.current) return;
    pulling.current = false;

    if (pullDistance >= THRESHOLD) {
      setState("refreshing");
      setPullDistance(THRESHOLD);
      try {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["uber"] }),
          queryClient.invalidateQueries({ queryKey: ["weather"] }),
        ]);
        showToast("Updated!");
      } catch {
        showToast("Refresh failed");
      }
    }

    setState("idle");
    setPullDistance(0);
  }, [pullDistance, queryClient, showToast]);

  const rotation = Math.min((pullDistance / THRESHOLD) * 180, 180);
  const ready = pullDistance >= THRESHOLD;

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        touchAction: "pan-y",
        overscrollBehavior: "contain",
      }}
    >
      {/* Pull indicator */}
      <div
        className="flex items-center justify-center overflow-hidden transition-[height] duration-200"
        style={{
          height: state === "idle" ? 0 : pullDistance,
        }}
      >
        {state === "refreshing" ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-cod-green border-t-transparent" />
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={ready ? "#4a7c2b" : "#888"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        )}
      </div>
      {children}
    </div>
  );
}
