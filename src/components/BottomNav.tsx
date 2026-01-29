"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "schedule", icon: "\ud83d\udcc5", label: "Schedule" },
  { id: "food", icon: "\ud83c\udf7d\ufe0f", label: "Food" },
  { id: "uber", icon: "\ud83d\ude97", label: "Uber" },
];

export default function BottomNav() {
  const [active, setActive] = useState(navItems[0].id);

  function scrollTo(sectionId: string) {
    setActive(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-cod-lime/30 bg-cod-black/95 backdrop-blur-md py-2">
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`cursor-pointer border-none bg-none min-h-[44px] px-3 py-2 text-center font-heading text-[11px] tracking-[0.05em] transition-all duration-200 ${
            active === item.id ? "text-cod-lime" : "text-cod-gray"
          }`}
        >
          <span className="mb-0.5 block text-[18px]">{item.icon}</span>
          {item.label}
        </motion.button>
      ))}
    </nav>
  );
}
