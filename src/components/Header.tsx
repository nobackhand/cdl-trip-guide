"use client";

import { motion } from "framer-motion";
import { useEventModeContext } from "@/components/EventModeProvider";

export default function Header() {
  const { mode, isOverridden, toggleMode } = useEventModeContext();

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-cod-green bg-gradient-to-b from-cod-dark/95 to-cod-black/95 backdrop-blur-md px-4 py-6 pb-4 text-center">
      <div className="font-heading text-[11px] uppercase tracking-[4px] text-cod-gray">
        Call of Duty League
      </div>
      <h1 className="font-heading text-[28px] font-bold uppercase tracking-[2px]">
        Major I Weekend
      </h1>
      <div className="mt-1 text-[11px] text-cod-orange">
        Dallas, TX &bull; Jan 29 - Feb 1, 2026
      </div>

      {/* Mode Toggle */}
      <div className="mt-3 flex flex-col items-center gap-1">
        <div className="relative flex rounded-full bg-cod-dark2 p-0.5">
          {/* Animated background pill */}
          <motion.div
            className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full ${
              mode === "preparing" ? "bg-cod-green" : "bg-cod-orange"
            }`}
            animate={{ x: mode === "preparing" ? 2 : "calc(100% + 2px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          <button
            onClick={mode !== "preparing" ? toggleMode : undefined}
            className={`relative z-10 cursor-pointer rounded-full border-none px-4 py-1.5 text-[11px] font-bold transition-colors ${
              mode === "preparing"
                ? "text-white"
                : "text-cod-gray hover:text-white"
            }`}
          >
            Preparing
          </button>
          <button
            onClick={mode !== "gametime" ? toggleMode : undefined}
            className={`relative z-10 cursor-pointer rounded-full border-none px-4 py-1.5 text-[11px] font-bold transition-colors ${
              mode === "gametime"
                ? "text-white"
                : "text-cod-gray hover:text-white"
            }`}
          >
            Game Time
          </button>
        </div>
        {isOverridden && (
          <span className="text-[9px] text-cod-gray opacity-70">(manual)</span>
        )}
      </div>
    </header>
  );
}
