"use client";

import { motion } from "framer-motion";
import { useEventModeContext } from "@/components/EventModeProvider";
import { LINKS } from "@/lib/constants";

const preparingActions = [
  { icon: "\ud83c\udfe8", label: "Book Hotel", href: LINKS.hotel },
  { icon: "\ud83c\udfab", label: "Tickets", href: "https://www.callofdutyleague.com/en-us/tickets" },
  { icon: "\ud83d\udccd", label: "Venue Map", href: LINKS.venue },
  { icon: "\ud83d\udcfa", label: "CDL Stream", href: LINKS.stream },
];

const gametimeActions = [
  { icon: "\ud83d\ude97", label: "Uber", href: "#uber", scroll: true },
  { icon: "\ud83c\udf7d\ufe0f", label: "Food", href: "#food", scroll: true },
  { icon: "\ud83c\udf7a", label: "Knox Bars", href: "https://maps.app.goo.gl/knox-henderson-dallas" },
  { icon: "\ud83d\udcf1", label: "Share", href: "https://reddit.com/r/CoDCompetitive", external: true },
];

export default function QuickActions() {
  const { mode } = useEventModeContext();
  const actions = mode === "preparing" ? preparingActions : gametimeActions;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, action: typeof actions[0]) {
    if ('scroll' in action && action.scroll) {
      e.preventDefault();
      const el = document.getElementById(action.href.replace("#", ""));
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }

  return (
    <div className="grid grid-cols-4 gap-2 py-3">
      {actions.map((a) => (
        <motion.a
          key={a.label}
          href={a.href}
          target={!('scroll' in a) ? "_blank" : undefined}
          rel={!('scroll' in a) ? "noopener noreferrer" : undefined}
          onClick={(e) => handleClick(e, a)}
          whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.92 }}
          className="rounded-sm border-t-2 border-cod-lime bg-cod-dark2 px-1 py-2.5 text-center text-white no-underline active:bg-cod-green/20"
        >
          <motion.span
            className="mb-1 block text-[18px]"
            whileTap={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.3 }}
          >
            {a.icon}
          </motion.span>
          <span className="font-heading text-[8px] uppercase tracking-[0.05em]">{a.label}</span>
        </motion.a>
      ))}
    </div>
  );
}
