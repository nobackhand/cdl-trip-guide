"use client";

import { motion } from "framer-motion";
import { LINKS } from "@/lib/constants";

const actions = [
  { icon: "\ud83c\udfe8", label: "Book", href: LINKS.hotel },
  { icon: "\ud83d\udcfa", label: "Watch", href: LINKS.stream },
  { icon: "\ud83d\udccd", label: "Venue", href: LINKS.venue },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-2 py-3">
      {actions.map((a) => (
        <motion.a
          key={a.label}
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.92 }}
          className="rounded-lg border border-cod-green/50 glass-card px-1 py-2.5 text-center text-white no-underline active:bg-cod-green/20"
        >
          <motion.span className="mb-1 block text-[18px]" whileTap={{ scale: 1.2, rotate: [0, -10, 10, 0] }} transition={{ duration: 0.3 }}>
            {a.icon}
          </motion.span>
          <span className="text-[8px] font-semibold uppercase">{a.label}</span>
        </motion.a>
      ))}
      <motion.a
        href="#splitter"
        whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
        whileTap={{ scale: 0.92 }}
        className="rounded-lg border border-cod-green/50 glass-card px-1 py-2.5 text-center text-white no-underline active:bg-cod-green/20"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("splitter")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        <motion.span className="mb-1 block text-[18px]" whileTap={{ scale: 1.2, rotate: [0, -10, 10, 0] }} transition={{ duration: 0.3 }}>
          {"\ud83d\udcb0"}
        </motion.span>
        <span className="text-[8px] font-semibold uppercase">Split</span>
      </motion.a>
    </div>
  );
}
