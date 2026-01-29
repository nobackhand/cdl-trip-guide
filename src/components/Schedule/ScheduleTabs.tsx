"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scheduleDays } from "@/data/schedule";
import DaySchedule from "./DaySchedule";
import BracketView from "./BracketView";

type TabId = string | "bracket";

export default function ScheduleTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("thu");

  const tabs = [
    ...scheduleDays.map((d) => ({ id: d.id, label: d.tabLabel })),
    { id: "bracket", label: "Bracket" },
  ];

  return (
    <section id="schedule" className="my-5">
      <h2 className="cdl-section-header">
        {"\ud83d\udcc5"} Match Schedule
      </h2>
      <div className="section-divider" />

      {/* Stream Banner */}
      <motion.a
        href="https://www.youtube.com/CDL"
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.98 }}
        className="my-4 flex items-center gap-3 rounded-sm border border-cod-lime/30 bg-cod-dark2 p-3 text-white no-underline"
      >
        <span className="text-[28px]">{"\u25b6\ufe0f"}</span>
        <div>
          <div className="font-heading text-[16px] tracking-[0.05em]">Watch CDL Major I Live</div>
          <div className="text-[11px] opacity-80">YouTube or Twitch.tv/CDL</div>
        </div>
      </motion.a>

      {/* Tabs */}
      <div className="mb-3 flex gap-1.5 overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer whitespace-nowrap rounded-sm border-none min-h-[44px] px-3 py-2 font-heading text-[12px] tracking-[0.05em] ${
              activeTab === tab.id
                ? "bg-cod-lime text-cod-black"
                : "bg-cod-dark2 text-cod-gray"
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab Content with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "bracket" ? (
            <BracketView />
          ) : (
            scheduleDays
              .filter((d) => d.id === activeTab)
              .map((day) => <DaySchedule key={day.id} day={day} />)
          )}
        </motion.div>
      </AnimatePresence>

    </section>
  );
}
