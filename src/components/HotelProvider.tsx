"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Hotel {
  id: string;
  name: string;
  address: string;
  // Distance in miles from Moody Coliseum
  distanceToVenue: number;
  // Coordinates for future use
  lat: number;
  lng: number;
}

// Custom coordinates for "Other" location (GPS-based or geocoded)
export interface CustomCoords {
  lat: number;
  lng: number;
  source: "gps" | "geocoded";
}

// Popular hotels near Moody Coliseum / SMU area
export const HOTEL_OPTIONS: Hotel[] = [
  {
    id: "la-quinta-uptown",
    name: "La Quinta Uptown",
    address: "4440 N Central Expy, Dallas, TX 75206",
    distanceToVenue: 1.5,
    lat: 32.8177,
    lng: -96.7873,
  },
  {
    id: "hilton-park-cities",
    name: "Hilton Dallas Park Cities",
    address: "5954 Luther Ln, Dallas, TX 75225",
    distanceToVenue: 0.8,
    lat: 32.8447,
    lng: -96.7907,
  },
  {
    id: "marriott-uptown",
    name: "Dallas Marriott Uptown",
    address: "3641 Turtle Creek Blvd, Dallas, TX 75219",
    distanceToVenue: 2.8,
    lat: 32.8098,
    lng: -96.8055,
  },
  {
    id: "hotel-zaza",
    name: "Hotel ZaZa Uptown",
    address: "2332 Leonard St, Dallas, TX 75201",
    distanceToVenue: 3.2,
    lat: 32.7993,
    lng: -96.8009,
  },
  {
    id: "warwick-melrose",
    name: "Warwick Melrose Dallas",
    address: "3015 Oak Lawn Ave, Dallas, TX 75219",
    distanceToVenue: 2.5,
    lat: 32.8127,
    lng: -96.8062,
  },
  {
    id: "other",
    name: "Other / Not staying overnight",
    address: "",
    distanceToVenue: 0,
    lat: 0,
    lng: 0,
  },
];

interface HotelContextValue {
  selectedHotel: Hotel | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  customAddress: string;
  setCustomAddress: (address: string) => void;
  customCoords: CustomCoords | null;
  setCustomCoords: (coords: CustomCoords | null) => void;
  hasSelectedHotel: boolean;
  clearHotel: () => void;
}

const HotelContext = createContext<HotelContextValue | null>(null);

export function HotelProvider({ children }: { children: ReactNode }) {
  const [selectedHotel, setSelectedHotelState] = useState<Hotel | null>(null);
  const [customAddress, setCustomAddressState] = useState("");
  const [customCoords, setCustomCoordsState] = useState<CustomCoords | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cdl-hotel");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.hotelId) {
          const hotel = HOTEL_OPTIONS.find(h => h.id === parsed.hotelId);
          if (hotel) setSelectedHotelState(hotel);
        }
        if (parsed.customAddress) {
          setCustomAddressState(parsed.customAddress);
        }
        if (parsed.customCoords) {
          setCustomCoordsState(parsed.customCoords);
        }
      } catch {
        // Invalid JSON, ignore
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("cdl-hotel", JSON.stringify({
      hotelId: selectedHotel?.id || null,
      customAddress,
      customCoords,
    }));
  }, [selectedHotel, customAddress, customCoords, isLoaded]);

  const setSelectedHotel = (hotel: Hotel | null) => {
    setSelectedHotelState(hotel);
    if (hotel?.id !== "other") {
      setCustomAddressState("");
      setCustomCoordsState(null);
    }
  };

  const setCustomAddress = (address: string) => {
    setCustomAddressState(address);
  };

  const setCustomCoords = (coords: CustomCoords | null) => {
    setCustomCoordsState(coords);
  };

  const clearHotel = () => {
    setSelectedHotelState(null);
    setCustomAddressState("");
    setCustomCoordsState(null);
    localStorage.removeItem("cdl-hotel");
  };

  // Fixed: Added parentheses to fix precedence bug, and use .trim() to reject whitespace-only addresses
  const hasSelectedHotel =
    (selectedHotel !== null && selectedHotel.id !== "other") ||
    customAddress.trim().length > 0 ||
    customCoords !== null;

  return (
    <HotelContext.Provider
      value={{
        selectedHotel,
        setSelectedHotel,
        customAddress,
        setCustomAddress,
        customCoords,
        setCustomCoords,
        hasSelectedHotel,
        clearHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotel() {
  const ctx = useContext(HotelContext);
  if (!ctx) throw new Error("useHotel must be used within HotelProvider");
  return ctx;
}
