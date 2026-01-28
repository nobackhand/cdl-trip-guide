"use client";

import { useState, useEffect, useCallback } from "react";
import { EVENT_START } from "@/lib/constants";
import { useLocalStorage } from "./useLocalStorage";

export type EventMode = "preparing" | "gametime";

interface EventModeState {
  mode: EventMode;
  autoMode: EventMode;
  isOverridden: boolean;
  toggleMode: () => void;
}

export function useEventMode(): EventModeState {
  const [autoMode, setAutoMode] = useState<EventMode>(() =>
    Date.now() < EVENT_START.getTime() ? "preparing" : "gametime"
  );

  const [override, setOverride] = useLocalStorage<EventMode | null>(
    "cdl_event_mode",
    null
  );

  // Re-check auto mode every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const next = Date.now() < EVENT_START.getTime() ? "preparing" : "gametime";
      setAutoMode(next);
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const mode: EventMode = override ?? autoMode;

  const toggleMode = useCallback(() => {
    const next: EventMode = mode === "preparing" ? "gametime" : "preparing";
    setOverride(next);
  }, [mode, setOverride]);

  return { mode, autoMode, isOverridden: override !== null, toggleMode };
}
