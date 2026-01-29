"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";

export default function Countdown() {
  const { days, hours, mins, secs, isLive, isOver } = useCountdown();

  if (isOver) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-0 my-4 rounded-sm bg-gradient-to-br from-cod-green to-cod-green-dark p-4 text-center"
      >
        <div className="font-heading text-[11px] tracking-[0.3em] text-cod-gray">
          EVENT COMPLETED
        </div>
        <div className="relative z-10 mt-2 flex items-center justify-center gap-5">
          <span className="countdown-digit text-shadow-subtle">GG</span>
          <span className="countdown-digit text-shadow-subtle">&#127942;</span>
        </div>
      </motion.div>
    );
  }

  if (isLive) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-0 my-4 animate-[pulse-live_2s_infinite] rounded-sm bg-gradient-to-br from-cod-red to-cod-red-dark p-4 text-center"
      >
        <div className="flex items-center justify-center gap-2 font-heading text-[11px] tracking-[0.3em] text-cod-white">
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="inline-block h-2 w-2 rounded-full bg-white"
          />
          EVENT IS LIVE!
        </div>
        <div className="relative z-10 mt-2 flex items-center justify-center gap-5">
          <span className="countdown-digit text-shadow-subtle">&#127918;</span>
          <span className="countdown-digit text-shadow-subtle">LET&apos;S</span>
          <span className="countdown-digit text-shadow-subtle">GO!</span>
          <span className="countdown-digit text-shadow-subtle">&#128293;</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-2 text-center"
    >
      <div className="font-heading text-[11px] tracking-[0.3em] text-cod-gray">
        EVENT STARTS IN
      </div>
      <div className="relative z-10 mt-2 flex items-center justify-center gap-4">
        <FlipItem value={days.toString().padStart(2, "0")} unit="DAYS" />
        <FlipItem value={hours.toString().padStart(2, "0")} unit="HOURS" />
        <FlipItem value={mins.toString().padStart(2, "0")} unit="MINUTES" />
        <FlipItem value={secs.toString().padStart(2, "0")} unit="SECONDS" />
      </div>
    </motion.div>
  );
}

function FlipItem({ value, unit }: { value: string | number; unit: string }) {
  const digits = String(value).split("");
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-[2px]" style={{ perspective: "200px" }}>
        {digits.map((digit, i) => (
          <AnimatePresence mode="popLayout" key={i}>
            <motion.span
              key={`${i}-${digit}`}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{
                rotateX: 0,
                opacity: 1,
                scale: [0.8, 1.05, 1],
              }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="countdown-digit inline-block text-shadow-subtle"
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        ))}
      </div>
      <div className="countdown-unit">{unit}</div>
    </div>
  );
}
