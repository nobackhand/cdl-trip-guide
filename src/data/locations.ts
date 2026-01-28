export interface PlaceLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: "venue" | "hotel" | "food" | "bar";
  area: "venue" | "knox" | "deep";
  mapsUrl: string;
  subtitle: string;
  icon: string;
}

export const VENUE_COORDS = { lat: 32.8412, lng: -96.7837 };
export const HOTEL_COORDS = { lat: 32.8315, lng: -96.7697 };

export const placeLocations: PlaceLocation[] = [
  // Near Venue
  { id: "torchys", name: "Torchy's Tacos", lat: 32.8406, lng: -96.7880, category: "food", area: "venue", mapsUrl: "https://maps.google.com/?q=Torchys+Tacos+Dallas+Snider+Plaza", subtitle: "Austin-style tacos, quick & good", icon: "\ud83c\udf2e" },
  { id: "bubbas", name: "Bubba's Cooks Country", lat: 32.8398, lng: -96.7875, category: "food", area: "venue", mapsUrl: "https://maps.google.com/?q=Bubbas+Cooks+Country+Dallas", subtitle: "Fried chicken & comfort food", icon: "\ud83c\udf57" },
  { id: "twisted-root", name: "Twisted Root Burger Co", lat: 32.8410, lng: -96.7885, category: "food", area: "venue", mapsUrl: "https://maps.google.com/?q=Twisted+Root+Burger+Co+SMU+Dallas", subtitle: "Creative burgers, game day vibes", icon: "\ud83c\udf54" },
  { id: "shugs", name: "Shug's Bagels", lat: 32.8400, lng: -96.7870, category: "food", area: "venue", mapsUrl: "https://maps.google.com/?q=Shugs+Bagels+Dallas", subtitle: "Breakfast before day 1 matches", icon: "\ud83e\udd6f" },
  { id: "barley-house", name: "Barley House", lat: 32.8415, lng: -96.7890, category: "bar", area: "venue", mapsUrl: "https://maps.google.com/?q=Barley+House+Dallas+SMU", subtitle: "Sports bar, TVs for missed matches", icon: "\ud83c\udf7a" },

  // Knox-Henderson
  { id: "hg-sply", name: "HG Sply Co", lat: 32.8280, lng: -96.7930, category: "food", area: "knox", mapsUrl: "https://maps.google.com/?q=HG+Sply+Co+Dallas", subtitle: "Rooftop patio, healthy-ish plates", icon: "\ud83e\udd57" },
  { id: "fireside-pies", name: "Fireside Pies", lat: 32.8275, lng: -96.7925, category: "food", area: "knox", mapsUrl: "https://maps.google.com/?q=Fireside+Pies+Dallas", subtitle: "Wood-fired pizza + cocktails", icon: "\ud83c\udf55" },
  { id: "taverna-rossa", name: "Taverna Rossa", lat: 32.8270, lng: -96.7935, category: "food", area: "knox", mapsUrl: "https://maps.google.com/?q=Taverna+Rossa+Dallas", subtitle: "Italian, great pasta & wine", icon: "\ud83c\udf5d" },
  { id: "pie-tap", name: "Pie Tap Pizza", lat: 32.8285, lng: -96.7920, category: "food", area: "knox", mapsUrl: "https://maps.google.com/?q=Pie+Tap+Pizza+Workshop+Dallas", subtitle: "Detroit-style pizza + whiskey", icon: "\ud83c\udf55" },
  { id: "mexican-sugar", name: "Mexican Sugar", lat: 32.8290, lng: -96.7915, category: "food", area: "knox", mapsUrl: "https://maps.google.com/?q=Mexican+Sugar+Dallas", subtitle: "Upscale Mexican, great margs", icon: "\ud83c\udf36\ufe0f" },
  { id: "old-monk", name: "The Old Monk", lat: 32.8265, lng: -96.7940, category: "bar", area: "knox", mapsUrl: "https://maps.google.com/?q=The+Old+Monk+Dallas", subtitle: "Legendary pub, 100+ beers", icon: "\ud83c\udf7a" },
  { id: "barcadia", name: "Barcadia", lat: 32.8260, lng: -96.7945, category: "bar", area: "knox", mapsUrl: "https://maps.google.com/?q=Barcadia+Dallas", subtitle: "Arcade bar + retro games", icon: "\ud83d\udd79\ufe0f" },
  { id: "henderson-tap", name: "Henderson Tap House", lat: 32.8268, lng: -96.7938, category: "bar", area: "knox", mapsUrl: "https://maps.google.com/?q=Henderson+Tap+House+Dallas", subtitle: "Sports bar, watch highlights", icon: "\ud83d\udcfa" },
  { id: "skellig", name: "The Skellig", lat: 32.8272, lng: -96.7942, category: "bar", area: "knox", mapsUrl: "https://maps.google.com/?q=The+Skellig+Dallas", subtitle: "Irish pub, chill vibes", icon: "\u2618\ufe0f" },
  { id: "whats-on-tap", name: "What's on Tap", lat: 32.8278, lng: -96.7932, category: "bar", area: "knox", mapsUrl: "https://maps.google.com/?q=Whats+on+Tap+Dallas", subtitle: "Craft beer, outdoor seating", icon: "\ud83c\udf7b" },

  // Deep Ellum
  { id: "pecan-lodge", name: "Pecan Lodge", lat: 32.7873, lng: -96.7850, category: "food", area: "deep", mapsUrl: "https://maps.google.com/?q=Pecan+Lodge+Dallas", subtitle: "Best brisket in Dallas - worth the wait", icon: "\ud83c\udf56" },
  { id: "terry-blacks", name: "Terry Black's BBQ", lat: 32.7868, lng: -96.7830, category: "food", area: "deep", mapsUrl: "https://maps.google.com/?q=Terry+Blacks+BBQ+Dallas", subtitle: "Austin legend, no wait usually", icon: "\ud83e\udd69" },
  { id: "cane-rosso", name: "Cane Rosso", lat: 32.7870, lng: -96.7845, category: "food", area: "deep", mapsUrl: "https://maps.google.com/?q=Cane+Rosso+Deep+Ellum+Dallas", subtitle: "Neapolitan pizza, great patio", icon: "\ud83c\udf55" },
  { id: "serious-pizza", name: "Serious Pizza", lat: 32.7875, lng: -96.7840, category: "food", area: "deep", mapsUrl: "https://maps.google.com/?q=Serious+Pizza+Dallas", subtitle: "Giant slices, open til 3am", icon: "\ud83c\udf55" },
  { id: "ruins", name: "Ruins", lat: 32.7865, lng: -96.7855, category: "food", area: "deep", mapsUrl: "https://maps.google.com/?q=Ruins+Deep+Ellum+Dallas", subtitle: "Mexican street food, late night", icon: "\ud83c\udf2e" },
  { id: "adairs", name: "Adair's Saloon", lat: 32.7878, lng: -96.7835, category: "bar", area: "deep", mapsUrl: "https://maps.google.com/?q=Adairs+Saloon+Dallas", subtitle: "Dive bar, live country music", icon: "\ud83e\udd20" },
  { id: "cidercade", name: "Cidercade", lat: 32.7860, lng: -96.7860, category: "bar", area: "deep", mapsUrl: "https://maps.google.com/?q=Cidercade+Dallas", subtitle: "$12 unlimited arcade, 100+ games", icon: "\ud83c\udfae" },
  { id: "free-man", name: "The Free Man", lat: 32.7872, lng: -96.7848, category: "bar", area: "deep", mapsUrl: "https://maps.google.com/?q=The+Free+Man+Dallas", subtitle: "Jazz & blues, Cajun food", icon: "\ud83c\udfb7" },
  { id: "three-links", name: "Three Links", lat: 32.7876, lng: -96.7842, category: "bar", area: "deep", mapsUrl: "https://maps.google.com/?q=Three+Links+Dallas", subtitle: "Punk/indie shows, cheap drinks", icon: "\ud83c\udfb8" },
  { id: "dot-bar", name: "Dot Bar", lat: 32.7880, lng: -96.7838, category: "bar", area: "deep", mapsUrl: "https://maps.google.com/?q=Dot+Bar+Dallas+Deep+Ellum", subtitle: "Craft cocktails, chill rooftop", icon: "\ud83c\udf78" },
];
