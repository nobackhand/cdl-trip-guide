"use client";

import { useState, useEffect } from "react";
import { EVENT_START, EVENT_END } from "@/lib/constants";

interface CountdownState {
  days: number;
  hours: number;
  mins: number;
  secs: number;
  isLive: boolean;
  isOver: boolean;
}

export function useCountdown(): CountdownState {
  const [state, setState] = useState<CountdownState>({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
    isLive: false,
    isOver: false,
  });

  useEffect(() => {
    function update() {
      const now = new Date();

      if (now >= EVENT_START && now <= EVENT_END) {
        setState({ days: 0, hours: 0, mins: 0, secs: 0, isLive: true, isOver: false });
        return;
      }

      if (now > EVENT_END) {
        setState({ days: 0, hours: 0, mins: 0, secs: 0, isLive: false, isOver: true });
        return;
      }

      const diff = EVENT_START.getTime() - now.getTime();
      setState({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
        isLive: false,
        isOver: false,
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return state;
}
