"use client";

import { motion } from "framer-motion";
import { FoodLocation } from "@/lib/types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function LocationTab({ location }: { location: FoodLocation }) {
  return (
    <div>
      {location.proTip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 rounded-sm bg-gradient-to-br from-cod-green to-cod-green-dark p-3"
        >
          <div className="text-[13px] font-bold">
            {"\ud83d\udd25"} {location.proTip.title}
          </div>
          <div className="text-[12px] opacity-90">{location.proTip.text}</div>
        </motion.div>
      )}

      {location.categories.map((category) => (
        <div key={category.title} className="mb-4">
          <div className="mb-2 text-[13px] font-bold text-cod-lime">
            {category.icon} {category.title}
          </div>
          <motion.div variants={container} initial="hidden" animate="show">
            {category.spots.map((spot) => (
              <motion.a
                key={spot.name}
                variants={item}
                href={spot.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="my-1.5 flex items-center gap-2.5 rounded-sm glass-card px-3 py-2.5 text-white no-underline card-lift active:border-cod-green/50 active:bg-cod-green/20"
              >
                <span className="w-7 text-center text-[18px]">{spot.icon}</span>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold">{spot.name}</div>
                  <div className="text-[10px] text-cod-gray">{spot.subtitle}</div>
                </div>
                <span className="text-cod-gray">{"\u2192"}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
