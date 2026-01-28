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
      <h2 className="mb-1 font-heading text-[16px] font-bold uppercase tracking-[6px] text-cod-orange">
        {"\ud83d\udcc5"} Match Schedule
      </h2>
      <div className="section-divider" />

      {/* Stream Banner */}
      <motion.a
        href="https://www.youtube.com/CDL"
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.98 }}
        className="my-4 flex items-center gap-3 rounded-xl bg-gradient-to-br from-[#ff0000] to-[#cc0000] p-3 text-white no-underline"
      >
        <span className="text-[28px]">{"\u25b6\ufe0f"}</span>
        <div>
          <div className="text-[14px] font-bold">Watch CDL Major I Live</div>
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
            className={`cursor-pointer whitespace-nowrap rounded-lg border-none px-3 py-2 font-body text-[11px] font-semibold ${
              activeTab === tab.id
                ? "bg-cod-green text-white"
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

      {/* Hosted by */}
      <div className="mt-2 rounded-xl border-l-4 border-cod-lime glass-card p-4 text-center">
        <div className="text-[11px] text-cod-gray">Hosted by</div>
        <div className="text-[18px] font-bold text-cod-lime">OPTIC TEXAS</div>
        <div className="text-[10px] text-cod-gray">Defending Champions</div>
      </div>
    </section>
  );
}
