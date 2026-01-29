"use client";

import { motion } from "framer-motion";
import { useEventModeContext } from "@/components/EventModeProvider";

export default function Header() {
  const { mode, isOverridden, toggleMode } = useEventModeContext();

  return (
    <header className="sticky top-0 z-50 border-b border-cod-lime/30 bg-cod-black/95 backdrop-blur-md px-4 py-3">
      <div className="mx-auto flex max-w-[500px] items-center justify-between">
        <span className="font-heading text-[20px] tracking-[0.1em] text-cod-white">
          MAJOR I
        </span>
        <a
          href="https://www.callofdutyleague.com/en-us/tickets"
          target="_blank"
          rel="noopener noreferrer"
          className="cdl-btn-outline text-[12px] no-underline"
        >
          PURCHASE TICKETS &rarr;
        </a>
      </div>

      {/* Mode Toggle */}
      <div className="mx-auto mt-2 flex max-w-[500px] flex-col items-center gap-1">
        <div className="relative flex rounded-sm bg-cod-dark2 p-0.5">
          {/* Animated background pill */}
          <motion.div
            className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-sm ${
              mode === "preparing" ? "bg-cod-green" : "bg-cod-lime"
            }`}
            animate={{ x: mode === "preparing" ? 2 : "calc(100% + 2px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          <button
            onClick={mode !== "preparing" ? toggleMode : undefined}
            className={`relative z-10 cursor-pointer rounded-sm border-none px-4 py-1.5 font-heading text-[12px] tracking-[0.05em] transition-colors ${
              mode === "preparing"
                ? "text-white"
                : "text-cod-gray hover:text-white"
            }`}
          >
            PREPARING
          </button>
          <button
            onClick={mode !== "gametime" ? toggleMode : undefined}
            className={`relative z-10 cursor-pointer rounded-sm border-none px-4 py-1.5 font-heading text-[12px] tracking-[0.05em] transition-colors ${
              mode === "gametime"
                ? "text-cod-black"
                : "text-cod-gray hover:text-white"
            }`}
          >
            GAME TIME
          </button>
        </div>
        {isOverridden && (
          <span className="text-[9px] text-cod-gray opacity-70">(manual)</span>
        )}
      </div>
    </header>
  );
}
