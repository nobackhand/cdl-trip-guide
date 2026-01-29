"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHotel, HOTEL_OPTIONS, Hotel } from "@/components/HotelProvider";
import { useToast } from "@/components/Toast";
import { useLocationTips } from "@/hooks/useLocationTips";
import { LINKS } from "@/lib/constants";

export default function HotelSelector() {
  const { selectedHotel, setSelectedHotel, customAddress, setCustomAddress, customCoords, setCustomCoords, hasSelectedHotel, clearHotel } = useHotel();
  const { showToast } = useToast();
  const [isExpanded, setIsExpanded] = useState(!hasSelectedHotel);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [shakeInput, setShakeInput] = useState(false);

  // Get location tips for custom "Other" locations
  const { analysis: locationAnalysis } = useLocationTips({
    coords: selectedHotel?.id === "other" && customCoords ? customCoords : null,
    locationName: customAddress || "Your Location",
  });

  function handleSelect(hotel: Hotel) {
    if (hotel.id === "other") {
      setShowOtherInput(true);
      setShowManualInput(false);
      setSelectedHotel(hotel);
      setValidationError(null);
    } else {
      setSelectedHotel(hotel);
      setShowOtherInput(false);
      setShowManualInput(false);
      setIsExpanded(false);
      setValidationError(null);
    }
  }

  // Use browser geolocation to get current location
  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      showToast("Location not supported on this device", { type: "error" });
      return;
    }

    setGettingLocation(true);
    setValidationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCustomCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          source: "gps",
        });
        setCustomAddress("My Current Location");
        setGettingLocation(false);
        setIsExpanded(false);
        showToast("Location saved! Uber estimates will use your position", { type: "success", duration: 4000 });
      },
      (err) => {
        setGettingLocation(false);
        let errorMsg = "Couldn't get your location";
        if (err.code === 1) {
          errorMsg = "Location access denied. Please enable location in your browser settings.";
        } else if (err.code === 2) {
          errorMsg = "Location unavailable. Try again or enter address manually.";
        } else if (err.code === 3) {
          errorMsg = "Location request timed out. Try again.";
        }
        setValidationError(errorMsg);
        showToast(errorMsg, { type: "error", duration: 4500 });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [setCustomCoords, setCustomAddress, showToast]);

  // Geocode an address to get coordinates
  const geocodeAddress = useCallback(async (address: string) => {
    if (!address.trim()) return;

    setGeocoding(true);
    setValidationError(null);

    try {
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(address)}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          setValidationError("Address not found. Try adding more details or use GPS.");
          setShakeInput(true);
          setTimeout(() => setShakeInput(false), 500);
          return false;
        }
        throw new Error("Geocoding failed");
      }

      const data = await response.json();

      setCustomCoords({
        lat: data.lat,
        lng: data.lng,
        source: "geocoded",
      });

      showToast("Address found! Personalized tips generated", {
        type: "success",
        duration: 3000,
      });

      return true;
    } catch (error) {
      console.error("Geocoding error:", error);
      setValidationError("Couldn't verify address. Try GPS instead.");
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return false;
    } finally {
      setGeocoding(false);
    }
  }, [setCustomCoords, showToast]);

  async function handleCustomSubmit() {
    if (customAddress.trim()) {
      // Geocode the address to get coordinates
      const success = await geocodeAddress(customAddress);
      if (success) {
        setIsExpanded(false);
      }
    } else {
      // Trigger shake animation and show error
      setShakeInput(true);
      setValidationError("Please enter an address or use your location");
      setTimeout(() => setShakeInput(false), 500);
    }
  }

  // Build maps URL for the selected hotel
  const getMapsUrl = () => {
    if (selectedHotel?.id === "other" && customCoords) {
      return `https://www.google.com/maps/search/?api=1&query=${customCoords.lat},${customCoords.lng}`;
    }
    if (selectedHotel?.id === "la-quinta-uptown") {
      return LINKS.hotelMap;
    }
    if (selectedHotel?.address) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedHotel.address)}`;
    }
    return null;
  };

  // If hotel is selected, show compact view with tips
  if (hasSelectedHotel && !isExpanded) {
    const mapsUrl = getMapsUrl();
    const isCustomLocation = selectedHotel?.id === "other";
    const tips = isCustomLocation ? locationAnalysis?.tips : null;
    const perks = !isCustomLocation ? selectedHotel?.perks : null;

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-4 rounded-sm border border-cod-lime/30 bg-cod-dark2 p-4"
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[18px]">🏨</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-white">
                  {isCustomLocation ? customAddress : selectedHotel?.name}
                </span>
                {selectedHotel?.badge && (
                  <span className="rounded-sm bg-cod-lime px-1.5 py-0.5 text-[8px] font-bold uppercase text-cod-black">
                    {selectedHotel.badge}
                  </span>
                )}
              </div>
              {selectedHotel?.distanceToVenue && selectedHotel.distanceToVenue > 0 && (
                <div className="text-[10px] text-cod-gray">
                  {selectedHotel.distanceToVenue} mi from venue
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(true)}
            className="cursor-pointer rounded-sm border border-cod-lime/30 bg-transparent px-3 py-1.5 text-[10px] text-cod-lime transition-colors hover:bg-cod-lime/10"
          >
            Change
          </button>
        </div>

        {/* Perks/Tips inline */}
        {perks && perks.length > 0 && (
          <div className="mt-3 space-y-1 text-[11px] text-cod-lime">
            {perks.map((perk, i) => (
              <div key={i}>✓ {perk}</div>
            ))}
          </div>
        )}

        {/* Dynamic tips for custom location */}
        {tips && tips.length > 0 && (
          <div className="mt-3 space-y-1 text-[11px] text-cod-lime">
            {tips.slice(0, 3).map((tip, i) => (
              <div key={i}>{tip.icon} {tip.text}</div>
            ))}
          </div>
        )}

        {/* Pro tip for custom location */}
        {isCustomLocation && locationAnalysis?.proTip && (
          <div className="mt-3 rounded-sm border border-cod-lime/30 bg-cod-lime/10 p-2">
            <div className="text-[10px] text-white">💡 {locationAnalysis.proTip}</div>
          </div>
        )}

        {/* Open in Maps link */}
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 rounded-sm border border-cod-lime/20 bg-cod-black/50 px-3 py-2 text-white no-underline transition-colors hover:border-cod-lime/40"
          >
            <span className="text-[14px]">📍</span>
            <span className="flex-1 text-[11px]">Open in Maps</span>
            <span className="text-[10px] text-cod-gray">→</span>
          </a>
        )}
      </motion.div>
    );
  }

  // Full selection view
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-4 rounded-sm border border-cod-lime/50 bg-cod-dark2 p-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[18px]">🏨</span>
        <div>
          <div className="text-[13px] font-semibold text-white">Where are you staying?</div>
          <div className="text-[10px] text-cod-gray">
            We&apos;ll personalize distances and Uber estimates
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {HOTEL_OPTIONS.filter(h => h.id !== "other").map((hotel) => (
          <motion.button
            key={hotel.id}
            onClick={() => handleSelect(hotel)}
            whileTap={{ scale: 0.98 }}
            className={`w-full cursor-pointer rounded-sm border p-3 text-left transition-all ${
              selectedHotel?.id === hotel.id
                ? "border-cod-lime bg-cod-lime/10"
                : "border-cod-dark bg-cod-black/50 hover:border-cod-lime/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-white">{hotel.name}</span>
                {hotel.badge && (
                  <span className="rounded-sm bg-cod-lime px-1.5 py-0.5 text-[8px] font-bold uppercase text-cod-black">
                    {hotel.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {hotel.price && (
                  <span className="text-[10px] font-bold text-cod-lime">{hotel.price}</span>
                )}
                <span className="text-[10px] text-cod-gray">{hotel.distanceToVenue} mi</span>
              </div>
            </div>
            <div className="mt-0.5 text-[10px] text-cod-gray">{hotel.address}</div>
            {hotel.perks && hotel.perks.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] text-cod-lime/80">
                {hotel.perks.slice(0, 2).map((perk, i) => (
                  <span key={i}>✓ {perk}</span>
                ))}
              </div>
            )}
          </motion.button>
        ))}

        {/* Other option */}
        <motion.button
          onClick={() => handleSelect(HOTEL_OPTIONS.find(h => h.id === "other")!)}
          whileTap={{ scale: 0.98 }}
          className={`w-full cursor-pointer rounded-sm border p-3 text-left transition-all ${
            showOtherInput || selectedHotel?.id === "other"
              ? "border-cod-lime bg-cod-lime/10"
              : "border-cod-dark bg-cod-black/50 hover:border-cod-lime/30"
          }`}
        >
          <div className="text-[12px] font-medium text-white">Other location</div>
          <div className="mt-0.5 text-[10px] text-cod-gray">Airbnb, friend&apos;s place, or different hotel</div>
        </motion.button>

        <AnimatePresence>
          {showOtherInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-3">
                {/* Primary option: Use my location */}
                <button
                  onClick={handleUseMyLocation}
                  disabled={gettingLocation}
                  className="w-full cursor-pointer rounded-sm bg-cod-lime px-4 py-3 text-left transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <div className="flex items-center gap-2">
                    {gettingLocation ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-cod-black border-t-transparent" />
                        <span className="text-[12px] font-bold text-cod-black">Getting your location...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[16px]">📍</span>
                        <div>
                          <div className="text-[12px] font-bold text-cod-black">Use my current location</div>
                          <div className="text-[10px] text-cod-black/70">One tap, no typing needed</div>
                        </div>
                      </>
                    )}
                  </div>
                </button>

                {/* Secondary option: Enter manually */}
                {!showManualInput ? (
                  <button
                    onClick={() => setShowManualInput(true)}
                    className="w-full cursor-pointer rounded-sm border border-cod-lime/30 bg-transparent px-4 py-2 text-center text-[11px] text-cod-gray transition-colors hover:border-cod-lime/50 hover:text-white"
                  >
                    Or enter address manually
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={`flex gap-2 ${shakeInput ? "animate-shake" : ""}`}>
                      <input
                        type="text"
                        value={customAddress}
                        onChange={(e) => {
                          setCustomAddress(e.target.value);
                          if (validationError) setValidationError(null);
                        }}
                        placeholder="Enter address or area name"
                        disabled={geocoding}
                        className={`flex-1 rounded-sm border bg-cod-black px-3 py-2 text-[12px] text-white placeholder:text-cod-gray/50 focus:outline-none disabled:opacity-50 ${
                          validationError
                            ? "border-red-500 focus:border-red-500"
                            : "border-cod-lime/30 focus:border-cod-lime"
                        }`}
                      />
                      <button
                        onClick={handleCustomSubmit}
                        disabled={geocoding}
                        className="cursor-pointer rounded-sm bg-cod-lime px-4 py-2 text-[11px] font-bold text-cod-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {geocoding ? (
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-cod-black border-t-transparent" />
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                    {validationError && (
                      <div className="mt-1 text-[10px] text-red-400">{validationError}</div>
                    )}
                    <div className="mt-1 text-[9px] text-cod-gray/70">
                      We'll calculate real distances and Uber costs
                    </div>
                  </motion.div>
                )}

                {/* Show current location if set via GPS */}
                {customCoords?.source === "gps" && (
                  <div className="rounded-sm border border-cod-lime/30 bg-cod-lime/5 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px]">✓</span>
                      <div className="text-[11px] text-cod-lime">Location saved</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasSelectedHotel && (
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={clearHotel}
            className="cursor-pointer rounded-sm border-none bg-transparent px-3 py-1.5 text-[10px] text-cod-gray hover:text-white"
          >
            Clear
          </button>
          <button
            onClick={() => setIsExpanded(false)}
            className="cursor-pointer rounded-sm bg-cod-lime px-4 py-1.5 text-[11px] font-bold text-cod-black"
          >
            Done
          </button>
        </div>
      )}
    </motion.div>
  );
}
