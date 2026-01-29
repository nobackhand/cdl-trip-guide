"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { useEventModeContext } from "@/components/EventModeProvider";

export default function HeroSection() {
  const { mode, isOverridden, toggleMode } = useEventModeContext();
  const { days, hours, mins, secs, isLive, isOver } = useCountdown();

  return (
    <section className="relative -mx-4 overflow-hidden bg-gradient-to-br from-cod-dark via-cod-black to-cod-dark px-4 py-4">
      {/* Diagonal accent stripes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-10 top-0 h-full w-32 rotate-12 bg-gradient-to-b from-cod-lime/40 to-transparent" />
        <div className="absolute -right-10 bottom-0 h-full w-24 -rotate-12 bg-gradient-to-t from-cod-green/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-heading text-[28px] leading-none text-cod-white text-glow">
                MAJOR I
              </span>
              <span className="rounded-sm bg-cod-lime px-1.5 py-0.5 font-heading text-[10px] text-cod-black">
                OPTIC
              </span>
            </div>
            <div className="mt-0.5 text-[10px] tracking-[0.1em] text-cod-gray">
              JAN 29 - FEB 1 • MOODY COLISEUM, DALLAS
            </div>
          </div>

          {/* Countdown */}
          <div className="text-right">
            {isOver ? (
              <div className="font-heading text-[20px] text-cod-lime text-glow">GG!</div>
            ) : isLive ? (
              <motion.div
                className="flex items-center gap-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-cod-red shadow-[0_0_10px_rgba(255,68,68,0.8)]" />
                <span className="font-heading text-[20px] text-cod-red">LIVE</span>
              </motion.div>
            ) : (
              <div>
                <div className="font-heading text-[24px] leading-none text-cod-lime text-glow">
                  {days > 0 && <span className="text-cod-white">{days}<span className="text-[14px] text-cod-gray">d</span> </span>}
                  {hours.toString().padStart(2, "0")}
                  <span className="text-cod-white/50">:</span>
                  {mins.toString().padStart(2, "0")}
                  <span className="text-cod-white/50">:</span>
                  {secs.toString().padStart(2, "0")}
                </div>
                <div className="text-[9px] tracking-[0.15em] text-cod-gray">UNTIL KICKOFF</div>
              </div>
            )}
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="relative flex rounded-sm bg-cod-black/60 p-0.5 backdrop-blur-sm">
            <motion.div
              className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-sm shadow-lg ${
                mode === "preparing"
                  ? "bg-gradient-to-r from-cod-green to-cod-green-dark"
                  : "bg-gradient-to-r from-cod-lime to-cod-green"
              }`}
              animate={{ x: mode === "preparing" ? 2 : "calc(100% + 2px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button
              onClick={mode !== "preparing" ? toggleMode : undefined}
              className={`relative z-10 cursor-pointer rounded-sm border-none px-4 py-1.5 font-heading text-[11px] tracking-[0.05em] transition-colors ${
                mode === "preparing" ? "text-white" : "text-cod-gray hover:text-white"
              }`}
            >
              PREPARING
            </button>
            <button
              onClick={mode !== "gametime" ? toggleMode : undefined}
              className={`relative z-10 cursor-pointer rounded-sm border-none px-4 py-1.5 font-heading text-[11px] tracking-[0.05em] transition-colors ${
                mode === "gametime" ? "text-cod-black" : "text-cod-gray hover:text-white"
              }`}
            >
              GAME TIME
            </button>
          </div>
          {isOverridden && (
            <span className="text-[9px] text-cod-gray">(manual)</span>
          )}
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cod-lime to-transparent shadow-[0_0_15px_rgba(139,195,74,0.5)]" />
    </section>
  );
}
