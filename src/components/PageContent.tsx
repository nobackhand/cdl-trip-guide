"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEventModeContext } from "@/components/EventModeProvider";
import Countdown from "@/components/Countdown";
import LiveBanner from "@/components/LiveBanner";
import QuickActions from "@/components/QuickActions";
import UberLinks from "@/components/UberLinks";
import HotelCard from "@/components/HotelCard";
import CostSplitter from "@/components/CostSplitter";
import ScheduleTabs from "@/components/Schedule/ScheduleTabs";
import Predictions from "@/components/Predictions";
import FoodTabs from "@/components/FoodGuide/FoodTabs";
import Checklist from "@/components/Checklist";
import QuickInfo from "@/components/QuickInfo";
import TripPlanningAccordion from "@/components/TripPlanningAccordion";

export default function PageContent() {
  const { mode } = useEventModeContext();

  return (
    <>
      {/* Shared sections — always shown */}
      <Countdown />
      <LiveBanner />
      <QuickActions />

      {/* TL;DR Game Plan */}
      <div className="my-4 rounded-xl animated-gradient-orange p-3">
        <div className="text-[13px] font-bold">{"\u26a1"} TL;DR GAME PLAN</div>
        <div className="text-[12px] opacity-90">
          La Quinta Uptown ($236) → Walk to Knox bars → $10 Uber to venue → Save $350+
        </div>
      </div>

      {/* Mode-specific content */}
      <AnimatePresence mode="wait">
        {mode === "preparing" ? (
          <motion.div
            key="preparing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <UberLinks />
            <HotelCard />
            <CostSplitter />
            <ScheduleTabs />
            <Predictions />
            <FoodTabs />
            <Checklist />
            <QuickInfo />
          </motion.div>
        ) : (
          <motion.div
            key="gametime"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <UberLinks />
            <ScheduleTabs />
            <FoodTabs />
            <Predictions />
            <QuickInfo />
            <TripPlanningAccordion />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save for Offline — always shown */}
      <section className="my-5">
        <h2 className="mb-1 font-heading text-[16px] font-bold uppercase tracking-[6px] text-cod-orange">
          {"\ud83d\udcca"} Save for Offline
        </h2>
        <div className="section-divider" />
        <a
          href="/cdl_major_dashboard.png"
          download
          className="flex items-center gap-2.5 rounded-lg glass-card px-3 py-2.5 text-white no-underline card-lift active:border-cod-green/50 active:bg-cod-green/20"
        >
          <span className="w-7 text-center text-[18px]">{"\ud83d\uddbc\ufe0f"}</span>
          <div className="flex-1">
            <div className="text-[13px] font-semibold">Download Trip Dashboard (PNG)</div>
            <div className="text-[10px] text-cod-gray">Full visual guide with map</div>
          </div>
          <span className="text-cod-gray">{"\u2b07\ufe0f"}</span>
        </a>
      </section>
    </>
  );
}
