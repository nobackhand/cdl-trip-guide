"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { foodLocations } from "@/data/food";
import LocationTab from "./LocationTab";
import NearbyBanner from "./NearbyBanner";

export default function FoodTabs() {
  const [activeTab, setActiveTab] = useState("venue");

  const activeLocation = foodLocations.find((l) => l.id === activeTab);

  return (
    <section id="food" className="my-5">
      <h2 className="cdl-section-header">
        {"\ud83c\udf7d\ufe0f"} Food & Drink
      </h2>
      <div className="section-divider" />

      <NearbyBanner />

      <div className="mb-3 flex gap-1.5 overflow-x-auto">
        {foodLocations.map((loc) => (
          <motion.button
            key={loc.id}
            onClick={() => setActiveTab(loc.id)}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer whitespace-nowrap rounded-sm border-none px-3 py-2 font-heading text-[12px] tracking-[0.05em] ${
              activeTab === loc.id
                ? "bg-cod-lime text-cod-black"
                : "bg-cod-dark2 text-cod-gray"
            }`}
          >
            {loc.tabLabel}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeLocation && <LocationTab location={activeLocation} />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
