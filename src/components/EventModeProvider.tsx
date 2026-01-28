"use client";

import { createContext, useContext, ReactNode } from "react";
import { useEventMode, EventMode } from "@/hooks/useEventMode";

interface EventModeContextType {
  mode: EventMode;
  autoMode: EventMode;
  isOverridden: boolean;
  toggleMode: () => void;
}

const EventModeContext = createContext<EventModeContextType>({
  mode: "preparing",
  autoMode: "preparing",
  isOverridden: false,
  toggleMode: () => {},
});

export function useEventModeContext() {
  return useContext(EventModeContext);
}

export function EventModeProvider({ children }: { children: ReactNode }) {
  const value = useEventMode();

  return (
    <EventModeContext.Provider value={value}>
      {children}
    </EventModeContext.Provider>
  );
}
