"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEventModeContext } from "@/components/EventModeProvider";
import { useHotel } from "@/components/HotelProvider";
import LiveBanner from "@/components/LiveBanner";
import QuickActions from "@/components/QuickActions";
import UberLinks from "@/components/UberLinks";
import HotelCard from "@/components/HotelCard";
import HotelSelector from "@/components/HotelSelector";
import ScheduleTabs from "@/components/Schedule/ScheduleTabs";
import FoodTabs from "@/components/FoodGuide/FoodTabs";
import VenueTips from "@/components/VenueTips";
import ShareButton from "@/components/ShareButton";

export default function PageContent() {
  const { mode } = useEventModeContext();
  const { selectedHotel, hasSelectedHotel } = useHotel();

  // Generate personalized TL;DR based on hotel
  const getTldrText = () => {
    if (!hasSelectedHotel || selectedHotel?.id === "other") {
      return "Select your hotel above for personalized Uber estimates → Knox-Henderson for nightlife → Moody Coliseum for matches";
    }
    const distanceText = selectedHotel?.distanceToVenue
      ? `~$${Math.round(selectedHotel.distanceToVenue * 6)} Uber to venue`
      : "Short Uber to venue";
    return `${selectedHotel?.name} → ${distanceText} → Knox-Henderson for bars`;
  };

  return (
    <>
      {/* Shared sections — always shown */}
      <LiveBanner />
      <QuickActions />
      <HotelSelector />

      {/* TL;DR - mode specific */}
      {mode === "preparing" ? (
        <div className="my-4 rounded-sm border-l-4 border-cod-lime bg-cod-dark2 p-3">
          <div className="text-[13px] font-bold">{"\u26a1"} TL;DR PLAN</div>
          <div className="text-[12px] opacity-90">
            {getTldrText()}
          </div>
        </div>
      ) : (
        <div className="my-4 rounded-sm border-l-4 border-cod-lime bg-cod-dark2 p-3">
          <div className="text-[13px] font-bold">{"\ud83c\udfae"} GAME DAY TIPS</div>
          <div className="text-[12px] opacity-90">
            Parking at SMU lots ($20) • Clear bag policy • Snider Plaza for food nearby
          </div>
        </div>
      )}

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
            <ScheduleTabs />
            <HotelCard />
            <VenueTips />
            <FoodTabs />
            <UberLinks />
          </motion.div>
        ) : (
          <motion.div
            key="gametime"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ScheduleTabs />
            <VenueTips />
            <FoodTabs />
            <UberLinks />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share CTA */}
      <div className="my-6 rounded-sm border border-cod-lime/20 bg-cod-dark2 p-4 text-center">
        <div className="mb-2 text-[13px] font-semibold text-white">
          Going with friends? Share this guide!
        </div>
        <div className="mb-3 text-[11px] text-cod-gray">
          So everyone has hotel info, Uber prices & the schedule
        </div>
        <div className="flex justify-center">
          <ShareButton />
        </div>
      </div>
    </>
  );
}
