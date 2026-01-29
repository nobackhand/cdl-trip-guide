"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/Toast";
import { useHotel } from "@/components/HotelProvider";
import { useUberEstimates } from "@/hooks/useUberEstimates";
import { UberEstimate } from "@/lib/uber-pricing";

export default function UberLinks() {
  const { showToast } = useToast();
  const { selectedHotel, customCoords, hasSelectedHotel } = useHotel();
  const { estimates, hotelEstimate, locationSource, locationLoading, locationDenied, surge } = useUberEstimates();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Safe clipboard write with error handling
  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Clipboard API failed (common on mobile or non-HTTPS)
      return false;
    }
  }, []);

  // Combine standard estimates with hotel estimate if available
  const allEstimates: UberEstimate[] = hotelEstimate
    ? [...estimates, hotelEstimate]
    : estimates;

  async function handleTap(est: UberEstimate) {
    if (copiedId === est.key) {
      // Second tap - open Uber
      window.open(est.deepLink, "_blank");
      setCopiedId(null);
    } else {
      // First tap - copy address
      const copied = await copyToClipboard(est.address);
      if (copied) {
        showToast(`${est.address} copied! Tap again for Uber`, { duration: 4000 });
        setCopiedId(est.key);
        // Reset after 4 seconds
        setTimeout(() => setCopiedId(null), 4000);
      } else {
        // Clipboard failed - still allow opening Uber
        showToast("Couldn't copy address. Tap again to open Uber directly.", { type: "warning", duration: 4000 });
        setCopiedId(est.key);
        setTimeout(() => setCopiedId(null), 4000);
      }
    }
  }

  function getLocationIndicator() {
    if (locationLoading) {
      return (
        <span className="ml-2 inline-flex items-center gap-1 text-cod-gray">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cod-lime" />
          Getting your location...
        </span>
      );
    }
    if (locationSource === "gps") {
      return <span className="ml-2 text-cod-lime">• Prices from your location</span>;
    }
    if (locationSource === "custom" && customCoords) {
      return <span className="ml-2 text-cod-lime">• Prices from your saved location</span>;
    }
    if (locationSource === "hotel" && selectedHotel) {
      return <span className="ml-2 text-cod-lime">• Estimates from {selectedHotel.name}</span>;
    }
    // Default location or no location - show warning
    return null;
  }

  // Separate warning for GPS denied or default estimates
  function getLocationWarning() {
    if (locationLoading) return null;

    if (locationDenied) {
      return (
        <div className="mb-3 flex items-start gap-2 rounded-sm bg-amber-900/30 border border-amber-600/50 px-3 py-2">
          <span className="text-[14px]">📍</span>
          <div>
            <div className="text-[11px] font-medium text-amber-400">Location unavailable</div>
            <div className="text-[10px] text-amber-300/80">
              Showing default estimates. Enable location in your browser for accurate prices.
            </div>
          </div>
        </div>
      );
    }

    if (locationSource === "default") {
      return (
        <div className="mb-3 flex items-start gap-2 rounded-sm bg-cod-dark2 border border-cod-gray/30 px-3 py-2">
          <span className="text-[14px]">ℹ️</span>
          <div className="text-[10px] text-cod-gray">
            Estimates based on Uptown area. Select your hotel above for personalized prices.
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <section id="uber" className="my-5">
      <h2 className="cdl-section-header">
        🚗 Quick Rides
      </h2>
      <div className="section-divider" />

      {/* Location warning (GPS denied or default) */}
      {getLocationWarning()}

      <p className="mb-3 text-[10px] text-cod-gray">
        Tap to copy address • Tap again to open Uber
        {getLocationIndicator()}
        {surge > 1 && (
          <span className="ml-2 text-amber-400">• {surge}x surge pricing</span>
        )}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {allEstimates.map((est) => (
          <motion.button
            key={est.key}
            onClick={() => handleTap(est)}
            whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.96 }}
            className={`cursor-pointer rounded-sm glass-card p-3 text-left transition-all ${
              copiedId === est.key
                ? "border-cod-lime bg-cod-lime/10"
                : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[16px]">{est.icon}</span>
              {copiedId === est.key && (
                <span className="rounded-sm bg-cod-lime px-1.5 py-0.5 text-[8px] font-bold text-cod-black">
                  TAP FOR UBER
                </span>
              )}
            </div>
            <div className="mt-1 text-[12px] font-semibold text-white">{est.name}</div>
            <div className="text-[18px] font-bold text-cod-lime text-glow">
              ${est.fareRange.low}-${est.fareRange.high}
            </div>
            <div className="text-[9px] text-cod-gray">
              {est.miles} mi • {est.duration} min
            </div>
            {copiedId === est.key ? (
              <div className="mt-1 text-[9px] text-cod-lime">✓ Address copied!</div>
            ) : (
              <div className="mt-1 truncate text-[9px] text-cod-gray/70">{est.address}</div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Direct copy buttons */}
      <div className="mt-3 flex gap-2">
        <button
          onClick={async () => {
            const copied = await copyToClipboard("Moody Coliseum, 3100 Dyer St, Dallas, TX 75205");
            if (copied) {
              showToast("Venue address copied!");
            } else {
              showToast("Couldn't copy address", { type: "error" });
            }
          }}
          className="flex-1 cursor-pointer rounded-sm border border-cod-lime/30 bg-cod-dark2 px-3 py-2 text-[11px] text-cod-gray transition-colors hover:text-white"
        >
          📍 Copy Venue Address
        </button>
        {hasSelectedHotel && selectedHotel?.id !== "other" && selectedHotel?.address && (
          <button
            onClick={async () => {
              const copied = await copyToClipboard(selectedHotel.address);
              if (copied) {
                showToast("Your hotel address copied!");
              } else {
                showToast("Couldn't copy address", { type: "error" });
              }
            }}
            className="flex-1 cursor-pointer rounded-sm border border-cod-lime/30 bg-cod-dark2 px-3 py-2 text-[11px] text-cod-gray transition-colors hover:text-white"
          >
            🏨 Copy My Hotel
          </button>
        )}
      </div>

      {/* DART Rail Backup */}
      <div className="mt-4 rounded-sm border border-blue-500/30 bg-blue-900/10 p-3">
        <div className="flex items-center gap-2">
          <span className="text-[16px]">🚇</span>
          <div className="text-[12px] font-semibold text-blue-400">DART Rail Backup</div>
        </div>
        <div className="mt-2 text-[11px] text-cod-gray">
          If Uber surges or roads ice over, take DART Rail to <strong className="text-white">Mockingbird Station</strong> (Red/Orange/Blue lines).
          It's a ~1 mile walk to the venue, or catch the Mustang Express shuttle.
        </div>
        <div className="mt-2 flex gap-2">
          <a
            href="https://www.dart.org/trip/trip-planner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm bg-blue-600/20 px-2 py-1 text-[10px] text-blue-400 no-underline transition-colors hover:bg-blue-600/30"
          >
            DART Trip Planner →
          </a>
          <a
            href="https://maps.google.com/?q=Mockingbird+Station+Dallas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm bg-blue-600/20 px-2 py-1 text-[10px] text-blue-400 no-underline transition-colors hover:bg-blue-600/30"
          >
            Station on Map →
          </a>
        </div>
      </div>
    </section>
  );
}
