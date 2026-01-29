"use client";

import { motion } from "framer-motion";
import { LINKS } from "@/lib/constants";

const actions = [
  { icon: "\ud83c\udfe8", label: "Book Hotel", href: LINKS.hotel },
  { icon: "\ud83c\udfab", label: "Tickets", href: "https://www.callofdutyleague.com/en-us/tickets" },
  { icon: "\ud83d\udccd", label: "Venue Map", href: LINKS.venue },
  { icon: "\ud83d\udcfa", label: "CDL Stream", href: LINKS.stream },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3 py-3">
      {actions.map((a) => (
        <motion.a
          key={a.label}
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.92 }}
          className="rounded-sm border-t-2 border-cod-lime bg-cod-dark2 px-1 py-3 text-center text-white no-underline active:bg-cod-green/20"
        >
          <motion.span
            className="mb-1 block text-[18px]"
            whileTap={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.3 }}
          >
            {a.icon}
          </motion.span>
          <span className="font-heading text-[10px] uppercase tracking-[0.05em]">{a.label}</span>
        </motion.a>
      ))}
    </div>
  );
}
