"use client";

import { motion } from "framer-motion";
import { useNearbyPlaces } from "@/hooks/useNearbyPlaces";
import { placeLocations } from "@/data/locations";

export default function NearbyBanner() {
  const { nearby, loading, error } = useNearbyPlaces(placeLocations, 1.5);

  if (loading || error || nearby.length === 0) return null;

  const closest = nearby[0];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
      className="mb-4 rounded-sm border border-cod-green/30 bg-cod-green/5 p-3"
    >
      <div className="text-[12px] font-semibold text-cod-lime">
        {"\ud83d\udccd"} Near you right now
      </div>
      <div className="mt-0.5 text-[13px] font-semibold text-white">
        {closest.icon} {closest.name} &mdash; {closest.distance.toFixed(1)} mi
      </div>
      <div className="text-[10px] text-cod-gray">{closest.subtitle}</div>
      <a
        href={closest.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block text-[11px] text-cod-lime no-underline"
      >
        Get directions &rarr;
      </a>
      {nearby.length > 1 && (
        <div className="mt-2 border-t border-cod-green/30 pt-2">
          <div className="text-[9px] text-cod-gray">ALSO NEARBY</div>
          {nearby.slice(1, 4).map((place) => (
            <a
              key={place.id}
              href={place.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center justify-between text-[11px] text-white no-underline"
            >
              <span>
                {place.icon} {place.name}
              </span>
              <span className="text-cod-gray">{place.distance.toFixed(1)} mi</span>
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}
