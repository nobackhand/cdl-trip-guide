"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tips = [
  {
    icon: "💳",
    title: "Cashless Venue",
    info: "Credit cards, Apple Pay, Google Pay only. No cash accepted anywhere.",
  },
  {
    icon: "🧊",
    title: "Ice Storm Advisory",
    info: "Dallas roads ice over fast in winter. If weather turns, use DART Rail from Mockingbird Station (1 mile walk).",
    link: "https://www.dart.org/trip/trip-planner",
    linkText: "DART Trip Planner →",
  },
  {
    icon: "🚗",
    title: "Parking",
    info: "SMU lots around Moody Coliseum - $20/day. Arrive early on Saturday!",
    link: "https://maps.google.com/?q=SMU+Parking+Moody+Coliseum",
  },
  {
    icon: "👜",
    title: "Bag Policy",
    info: "Clear bags only (12\"x12\"x6\"). Small clutches OK. No backpacks.",
  },
  {
    icon: "📱",
    title: "WiFi",
    info: "Venue WiFi available but expect it to be slow. Download offline content.",
  },
  {
    icon: "⏰",
    title: "Doors Open",
    info: "1 hour before first match. Come early for merch and good seats.",
  },
  {
    icon: "🎟️",
    title: "Tickets",
    info: "Mobile tickets only - have your phone charged! Screenshot your QR.",
  },
  {
    icon: "🌡️",
    title: "Inside Temp",
    info: "AC is cold - bring a hoodie even if it's warm outside.",
  },
];

export default function VenueTips() {
  const [expanded, setExpanded] = useState(false);
  const visibleTips = expanded ? tips : tips.slice(0, 3);

  return (
    <section id="venue-tips" className="my-5">
      <h2 className="cdl-section-header">
        {"\ud83c\udfdf\ufe0f"} Venue Tips
      </h2>
      <div className="section-divider" />

      <div className="rounded-sm glass-card p-3">
        <AnimatePresence initial={false}>
          {visibleTips.map((tip, i) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`flex items-start gap-3 ${
                i < visibleTips.length - 1 ? "mb-3 border-b border-cod-dark2 pb-3" : ""
              }`}
            >
              <span className="text-[20px]">{tip.icon}</span>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-cod-white">{tip.title}</div>
                <div className="text-[11px] text-cod-gray">{tip.info}</div>
                {tip.link && (
                  <a
                    href={tip.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[10px] text-cod-lime no-underline"
                  >
                    {tip.linkText || "Open in Maps →"}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {tips.length > 3 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 w-full cursor-pointer border-none bg-transparent py-1 font-heading text-[11px] tracking-[0.05em] text-cod-lime"
          >
            {expanded ? "SHOW LESS ▲" : `SHOW ${tips.length - 3} MORE ▼`}
          </button>
        )}
      </div>

      {/* First Timer Banner */}
      <div className="mt-3 rounded-sm border border-cod-lime/30 bg-cod-green/10 p-3">
        <div className="text-[12px] font-semibold text-cod-lime">{"\ud83d\udc4b"} First CDL Event?</div>
        <div className="mt-1 text-[11px] text-cod-gray">
          Moody Coliseum is on SMU campus. Street parking is limited - use the SMU lots.
          Knox-Henderson (10 min Uber) has the best nightlife after matches.
        </div>
        <a
          href="https://reddit.com/r/CoDCompetitive"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[10px] text-cod-lime no-underline"
        >
          Join r/CoDCompetitive for meetups →
        </a>
      </div>
    </section>
  );
}
