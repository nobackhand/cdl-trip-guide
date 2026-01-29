"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useCurrentContext } from "@/hooks/useCurrentContext";
import { fetchWeather } from "@/lib/api";
import { cn } from "@/lib/utils";

const colorMap = {
  red: "from-[#dc2626] to-[#b91c1c]",
  orange: "from-cod-green to-cod-green-dark",
  cyan: "from-cod-green to-cod-green-dark",
  green: "from-cod-green to-cod-green-dark",
};

function CompactWeather() {
  const { data, isLoading } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

  if (isLoading) {
    return <div className="text-[11px] text-white/60">...</div>;
  }

  const temp = data?.temp ?? 55;
  const description = data?.description ?? "Clouds";

  return (
    <div className="flex items-center gap-1.5 text-[11px] text-white/90">
      <span>{temp}°F</span>
      <span className="text-white/60">•</span>
      <span className="text-white/70">{description}</span>
    </div>
  );
}

export default function LiveBanner() {
  const context = useCurrentContext();

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
      <div className="flex items-center justify-between">
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
        <CompactWeather />
      </div>
      <div className="text-[11px] opacity-90">{context.subtitle}</div>
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
