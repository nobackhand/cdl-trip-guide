"use client";

import LiveBanner from "@/components/LiveBanner";
import UberLinks from "@/components/UberLinks";
import HotelSelector from "@/components/HotelSelector";
import ScheduleTabs from "@/components/Schedule/ScheduleTabs";
import FoodTabs from "@/components/FoodGuide/FoodTabs";
import VenueTips from "@/components/VenueTips";

export default function PageContent() {
  return (
    <>
      {/* At-venue priority: what's happening → rules → food */}
      <LiveBanner />
      <ScheduleTabs />
      <VenueTips />
      <FoodTabs />

      {/* Hotel & transport — unified hotel section */}
      <HotelSelector />
      <UberLinks />
    </>
  );
}
