"use client";

import { useState, useEffect } from "react";
import { scheduleDays } from "@/data/schedule";
import { EVENT_START, EVENT_END } from "@/lib/constants";

export interface CurrentContext {
  type: "pre-event" | "match-live" | "match-soon" | "break" | "evening" | "late-night" | "morning" | "post-event";
  title: string;
  subtitle: string;
  action?: { label: string; href: string };
  color: "green" | "red" | "orange" | "cyan";
}

/** Parse a schedule time like "3:30 PM" on a given date into a Date object (CT) */
function parseMatchTime(dateStr: string, timeStr: string): Date {
  const dateMap: Record<string, string> = {
    "Jan 29": "2026-01-29",
    "Jan 30": "2026-01-30",
    "Jan 31": "2026-01-31",
    "Feb 1": "2026-02-01",
  };
  const isoDate = dateMap[dateStr];
  if (!isoDate) return new Date(0);

  const [time, ampm] = timeStr.split(" ");
  const [hStr, mStr] = time.split(":");
  let h = parseInt(hStr);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;

  return new Date(`${isoDate}T${h.toString().padStart(2, "0")}:${mStr}:00-06:00`);
}

// Build flat match list with start times
interface FlatMatch {
  title: string;
  note: string;
  start: Date;
  end: Date; // estimated ~90min per Bo5
}

const allMatches: FlatMatch[] = scheduleDays.flatMap((day) =>
  day.matches.map((m) => {
    const start = parseMatchTime(day.date, m.time);
    return {
      title: m.title,
      note: m.note,
      start,
      end: new Date(start.getTime() + 90 * 60 * 1000),
    };
  })
);

function getContext(now: Date): CurrentContext {
  // Pre-event
  if (now < EVENT_START) {
    const diff = EVENT_START.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return {
      type: "pre-event",
      title: `\ud83c\udfae CDL Major I in ${days} day${days !== 1 ? "s" : ""}!`,
      subtitle: "Dallas, TX \u2022 Jan 29 - Feb 1, 2026",
      color: "green",
    };
  }

  // Post-event
  if (now > EVENT_END) {
    return {
      type: "post-event",
      title: "\ud83c\udfc6 CDL Major I Complete!",
      subtitle: "GGs! Hope you had a blast in Dallas",
      color: "green",
    };
  }

  // During event - check matches
  const currentMatch = allMatches.find((m) => now >= m.start && now <= m.end);
  if (currentMatch) {
    return {
      type: "match-live",
      title: `\ud83d\udd34 LIVE: ${currentMatch.title}`,
      subtitle: currentMatch.note,
      action: { label: "Watch", href: "https://www.youtube.com/CDL" },
      color: "red",
    };
  }

  // Match coming soon (within 30 min)
  const upcoming = allMatches.find((m) => {
    const timeTo = (m.start.getTime() - now.getTime()) / 60000;
    return timeTo > 0 && timeTo <= 30;
  });
  if (upcoming) {
    const minsTo = Math.round((upcoming.start.getTime() - now.getTime()) / 60000);
    return {
      type: "match-soon",
      title: `\u23f0 ${upcoming.title} in ${minsTo}m`,
      subtitle: upcoming.note,
      color: "orange",
    };
  }

  // Time-of-day context using Dallas timezone
  const dallasTimeStr = now.toLocaleString("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: "America/Chicago",
  });
  const hour = parseInt(dallasTimeStr);

  if (hour >= 0 && hour < 4) {
    return {
      type: "late-night",
      title: "\ud83c\udf19 Late night eats",
      subtitle: "Serious Pizza open til 3am",
      action: { label: "See spots", href: "#food" },
      color: "cyan",
    };
  }

  if (hour >= 6 && hour < 10) {
    return {
      type: "morning",
      title: "\u2615 Good morning Dallas!",
      subtitle: "Free breakfast at La Quinta, then head to venue",
      color: "green",
    };
  }

  if (hour >= 19) {
    return {
      type: "evening",
      title: "\ud83c\udf7a Time to hit the bars!",
      subtitle: "Knox-Henderson is 0.5mi walk from hotel",
      action: { label: "See bars", href: "#food" },
      color: "cyan",
    };
  }

  // Between matches
  return {
    type: "break",
    title: "\ud83c\udfae Break between matches",
    subtitle: "Grab food nearby or check the bracket",
    action: { label: "Food spots", href: "#food" },
    color: "green",
  };
}

export function useCurrentContext(): CurrentContext {
  const [context, setContext] = useState<CurrentContext>(() => getContext(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setContext(getContext(new Date()));
    }, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return context;
}
