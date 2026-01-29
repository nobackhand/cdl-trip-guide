import { NextRequest, NextResponse } from "next/server";

// Photon is a free geocoding API based on OpenStreetMap data
// More permissive for server-side requests than Nominatim
const PHOTON_BASE = "https://photon.komoot.io/api";

// Dallas center coordinates for biasing results
const DALLAS_LAT = 32.78;
const DALLAS_LNG = -96.8;

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address required" }, { status: 400 });
  }

  try {
    // Add Dallas, TX to the query for better local results
    const searchQuery = address.toLowerCase().includes("dallas")
      ? address
      : `${address}, Dallas, TX`;

    // Photon API with location bias towards Dallas
    const url = `${PHOTON_BASE}?` +
      new URLSearchParams({
        q: searchQuery,
        limit: "1",
        lat: DALLAS_LAT.toString(),
        lon: DALLAS_LNG.toString(),
        lang: "en",
      });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Photon error:", response.status, response.statusText, errorText);
      return NextResponse.json(
        { error: "Geocoding service unavailable" },
        { status: 503 }
      );
    }

    const data = await response.json();

    if (!data.features || !data.features.length) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 });
    }

    // Photon returns GeoJSON format
    const result = data.features[0];
    const [lng, lat] = result.geometry.coordinates;
    const props = result.properties;

    // Build display name from properties
    const displayParts = [
      props.name,
      props.street,
      props.city,
      props.state,
      props.postcode,
    ].filter(Boolean);
    const displayName = displayParts.join(", ") || props.name || address;

    return NextResponse.json({
      lat: lat,
      lng: lng,
      displayName: displayName,
    });
  } catch (error) {
    console.error("Geocoding error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "Failed to geocode address" },
      { status: 500 }
    );
  }
}
