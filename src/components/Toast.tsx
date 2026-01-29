"use client";

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";

type ToastType = "default" | "success" | "warning" | "error";

interface ToastOptions {
  duration?: number; // ms, default 3500
  type?: ToastType;
}

interface ToastContextType {
  showToast: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const TOAST_STYLES: Record<ToastType, string> = {
  default: "bg-cod-green",
  success: "bg-cod-green",
  warning: "bg-amber-600",
  error: "bg-red-600",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("default");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((msg: string, options?: ToastOptions) => {
    // Clear any existing timeout to prevent flicker
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const duration = options?.duration ?? 3500; // Increased from 2000ms
    const type = options?.type ?? "default";

    setMessage(msg);
    setToastType(type);
    setVisible(true);

    timeoutRef.current = setTimeout(() => setVisible(false), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`pointer-events-none fixed bottom-20 left-1/2 z-[1000] -translate-x-1/2 rounded-sm px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity duration-300 ${
          TOAST_STYLES[toastType]
        } ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}
