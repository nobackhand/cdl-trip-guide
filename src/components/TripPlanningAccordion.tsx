"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HotelCard from "@/components/HotelCard";
import CostSplitter from "@/components/CostSplitter";
import Checklist from "@/components/Checklist";

export default function TripPlanningAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="my-5">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center gap-3 rounded-xl glass-card px-4 py-3 text-left card-lift active:bg-white/10"
      >
        <span className="text-[20px]">{"\ud83e\uddf3"}</span>
        <div className="flex-1">
          <div className="text-[14px] font-bold text-white">Trip Planning</div>
          <div className="text-[11px] text-cod-gray">
            Hotel, budget &amp; checklist
          </div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[16px] text-cod-gray"
        >
          {"\u25bc"}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <HotelCard />
              <CostSplitter />
              <Checklist />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
