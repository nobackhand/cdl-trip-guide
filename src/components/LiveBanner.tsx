"use client";

import { motion } from "framer-motion";
import { useCurrentContext } from "@/hooks/useCurrentContext";
import { useHotel } from "@/components/HotelProvider";
import { useLocationTips } from "@/hooks/useLocationTips";
import { cn } from "@/lib/utils";

const colorMap = {
  red: "from-[#dc2626] to-[#b91c1c]",
  orange: "from-cod-green to-cod-green-dark",
  cyan: "from-cod-green to-cod-green-dark",
  green: "from-cod-green to-cod-green-dark",
};

export default function LiveBanner() {
  const context = useCurrentContext();
  const { selectedHotel, customCoords, customAddress, hasSelectedHotel } = useHotel();

  // Get location tips if user has a custom location
  const { analysis } = useLocationTips({
    coords: selectedHotel?.id === "other" && customCoords ? customCoords : null,
    locationName: customAddress || "Your Location",
  });

  // For pre-event, show location-aware content instead of redundant info
  if (context.type === "pre-event") {
    // User has custom location with tips
    if (selectedHotel?.id === "other" && analysis) {
      const venueDist = analysis.distances.venue;
      const knoxDist = analysis.distances.knoxHenderson;
      return (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="my-3 rounded-sm bg-gradient-to-r from-cod-green to-cod-green-dark px-4 py-3"
        >
          <div className="text-[13px] font-bold">
            {"\u{1F4CD}"} {analysis.locationName}
            {analysis.neighborhood && (
              <span className="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-normal">
                {analysis.neighborhood}
              </span>
            )}
          </div>
          <div className="mt-1 text-[11px] opacity-90">
            {venueDist.miles} mi to venue (~${venueDist.uberCost.low} Uber) • Knox bars {knoxDist.miles} mi away
          </div>
        </motion.div>
      );
    }

    // User has a known hotel selected
    if (hasSelectedHotel && selectedHotel && selectedHotel.id !== "other") {
      return (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="my-3 rounded-sm bg-gradient-to-r from-cod-green to-cod-green-dark px-4 py-3"
        >
          <div className="text-[13px] font-bold">
            {"\u{1F3E8}"} {selectedHotel.name}
          </div>
          <div className="mt-1 text-[11px] opacity-90">
            {selectedHotel.distanceToVenue} mi to venue • ~${Math.round(selectedHotel.distanceToVenue * 6)} Uber • Walk to Knox-Henderson
          </div>
        </motion.div>
      );
    }

    // No hotel selected - prompt user
    return (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="my-3 rounded-sm bg-gradient-to-r from-cod-green to-cod-green-dark px-4 py-3"
      >
        <div className="text-[13px] font-bold">{"\u{1F4A1}"} Personalize your trip</div>
        <div className="mt-1 text-[11px] opacity-90">
          Select your hotel below for custom Uber costs & distance tips
        </div>
      </motion.div>
    );
  }

  // For all other contexts (during event), show the dynamic context
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "my-3 rounded-sm px-4 py-3 bg-gradient-to-r animate-[glow-pulse_3s_ease-in-out_infinite]",
        colorMap[context.color]
      )}
    >
      <div className="flex items-center gap-2">
        {context.type === "match-live" && (
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="inline-block h-2 w-2 rounded-full bg-white"
          />
        )}
        <div className="text-[13px] font-bold">{context.title}</div>
      </div>
      <div className="mt-1 text-[11px] opacity-90">{context.subtitle}</div>
      {context.action && (
        <a
          href={context.action.href}
          target={context.action.href.startsWith("http") ? "_blank" : undefined}
          rel={context.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="mt-1.5 inline-block rounded-sm bg-white/20 px-3 py-1 text-[11px] font-semibold text-white no-underline backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          {context.action.label}
        </a>
      )}
    </motion.div>
  );
}
