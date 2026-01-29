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

      {/* Footer */}
      <div className="my-8 text-center text-[11px] text-cod-gray">
        <a
          href="https://miccheck.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cod-gray hover:text-white transition-colors"
        >
          Need teammates for BO7? Try MicCheck
        </a>
      </div>
    </>
  );
}
