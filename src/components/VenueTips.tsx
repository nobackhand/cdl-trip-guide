"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tips = [
  {
    icon: "\ud83d\ude97",
    title: "Parking",
    info: "SMU lots around Moody Coliseum - $20/day. Arrive early on Saturday!",
    link: "https://maps.google.com/?q=SMU+Parking+Moody+Coliseum",
  },
  {
    icon: "\ud83d\udc5c",
    title: "Bag Policy",
    info: "Clear bags only (12\"x12\"x6\"). Small clutches OK. No backpacks.",
  },
  {
    icon: "\ud83d\udcf1",
    title: "WiFi",
    info: "Venue WiFi available but expect it to be slow. Download offline content.",
  },
  {
    icon: "\u23f0",
    title: "Doors Open",
    info: "1 hour before first match. Come early for merch and good seats.",
  },
  {
    icon: "\ud83c\udf9f\ufe0f",
    title: "Tickets",
    info: "Mobile tickets only - have your phone charged! Screenshot your QR.",
  },
  {
    icon: "\ud83c\udf21\ufe0f",
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
                    Open in Maps →
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
