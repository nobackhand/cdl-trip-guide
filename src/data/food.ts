import { FoodLocation } from "@/lib/types";

export const foodLocations: FoodLocation[] = [
  {
    id: "venue",
    tabLabel: "Near Venue",
    categories: [
      {
        title: "Snider Plaza & SMU Area",
        icon: "\ud83c\udf7d\ufe0f",
        spots: [
          {
            name: "Torchy's Tacos",
            icon: "\ud83c\udf2e",
            subtitle: "Austin-style tacos, quick & good",
            mapsUrl: "https://maps.google.com/?q=Torchys+Tacos+Dallas+Snider+Plaza",
          },
          {
            name: "Bubba's Cooks Country",
            icon: "\ud83c\udf57",
            subtitle: "Fried chicken & comfort food",
            mapsUrl: "https://maps.google.com/?q=Bubbas+Cooks+Country+Dallas",
          },
          {
            name: "Twisted Root Burger Co",
            icon: "\ud83c\udf54",
            subtitle: "Creative burgers, game day vibes",
            mapsUrl: "https://maps.google.com/?q=Twisted+Root+Burger+Co+SMU+Dallas",
          },
          {
            name: "Shug's Bagels",
            icon: "\ud83e\udd6f",
            subtitle: "Breakfast before day 1 matches",
            mapsUrl: "https://maps.google.com/?q=Shugs+Bagels+Dallas",
          },
          {
            name: "Barley House",
            icon: "\ud83c\udf7a",
            subtitle: "Sports bar, TVs for missed matches",
            mapsUrl: "https://maps.google.com/?q=Barley+House+Dallas+SMU",
          },
        ],
      },
    ],
  },
  {
    id: "knox",
    tabLabel: "Knox-Henderson",
    categories: [
      {
        title: "Dinner (Walk from La Quinta)",
        icon: "\ud83c\udf7d\ufe0f",
        spots: [
          {
            name: "HG Sply Co",
            icon: "\ud83e\udd57",
            subtitle: "Rooftop patio, healthy-ish plates",
            mapsUrl: "https://maps.google.com/?q=HG+Sply+Co+Dallas",
          },
          {
            name: "Fireside Pies",
            icon: "\ud83c\udf55",
            subtitle: "Wood-fired pizza + cocktails",
            mapsUrl: "https://maps.google.com/?q=Fireside+Pies+Dallas",
          },
          {
            name: "Taverna Rossa",
            icon: "\ud83c\udf5d",
            subtitle: "Italian, great pasta & wine",
            mapsUrl: "https://maps.google.com/?q=Taverna+Rossa+Dallas",
          },
          {
            name: "Pie Tap Pizza",
            icon: "\ud83c\udf55",
            subtitle: "Detroit-style pizza + whiskey",
            mapsUrl: "https://maps.google.com/?q=Pie+Tap+Pizza+Workshop+Dallas",
          },
          {
            name: "Mexican Sugar",
            icon: "\ud83c\udf36\ufe0f",
            subtitle: "Upscale Mexican, great margs",
            mapsUrl: "https://maps.google.com/?q=Mexican+Sugar+Dallas",
          },
        ],
      },
      {
        title: "Bars & Nightlife",
        icon: "\ud83c\udf7a",
        spots: [
          {
            name: "The Old Monk",
            icon: "\ud83c\udf7a",
            subtitle: "Legendary pub, 100+ beers",
            mapsUrl: "https://maps.google.com/?q=The+Old+Monk+Dallas",
          },
          {
            name: "Barcadia",
            icon: "\ud83d\udd79\ufe0f",
            subtitle: "Arcade bar + retro games",
            mapsUrl: "https://maps.google.com/?q=Barcadia+Dallas",
          },
          {
            name: "Henderson Tap House",
            icon: "\ud83d\udcfa",
            subtitle: "Sports bar, watch highlights",
            mapsUrl: "https://maps.google.com/?q=Henderson+Tap+House+Dallas",
          },
          {
            name: "The Skellig",
            icon: "\u2618\ufe0f",
            subtitle: "Irish pub, chill vibes",
            mapsUrl: "https://maps.google.com/?q=The+Skellig+Dallas",
          },
          {
            name: "What's on Tap",
            icon: "\ud83c\udf7b",
            subtitle: "Craft beer, outdoor seating",
            mapsUrl: "https://maps.google.com/?q=Whats+on+Tap+Dallas",
          },
        ],
      },
    ],
  },
  {
    id: "deep",
    tabLabel: "Deep Ellum",
    proTip: {
      title: "MUST TRY",
      text: "Pecan Lodge BBQ - Get there by 10:30am to skip the line!",
    },
    categories: [
      {
        title: "Food",
        icon: "\ud83c\udf56",
        spots: [
          {
            name: "Pecan Lodge",
            icon: "\ud83c\udf56",
            subtitle: "Best brisket in Dallas - worth the wait",
            mapsUrl: "https://maps.google.com/?q=Pecan+Lodge+Dallas",
          },
          {
            name: "Terry Black's BBQ",
            icon: "\ud83e\udd69",
            subtitle: "Austin legend, no wait usually",
            mapsUrl: "https://maps.google.com/?q=Terry+Blacks+BBQ+Dallas",
          },
          {
            name: "Cane Rosso",
            icon: "\ud83c\udf55",
            subtitle: "Neapolitan pizza, great patio",
            mapsUrl: "https://maps.google.com/?q=Cane+Rosso+Deep+Ellum+Dallas",
          },
          {
            name: "Serious Pizza",
            icon: "\ud83c\udf55",
            subtitle: "Giant slices, open til 3am",
            mapsUrl: "https://maps.google.com/?q=Serious+Pizza+Dallas",
          },
          {
            name: "Ruins",
            icon: "\ud83c\udf2e",
            subtitle: "Mexican street food, late night",
            mapsUrl: "https://maps.google.com/?q=Ruins+Deep+Ellum+Dallas",
          },
        ],
      },
      {
        title: "Bars & Venues",
        icon: "\ud83c\udf7a",
        spots: [
          {
            name: "Adair's Saloon",
            icon: "\ud83e\udd20",
            subtitle: "Dive bar, live country music",
            mapsUrl: "https://maps.google.com/?q=Adairs+Saloon+Dallas",
          },
          {
            name: "Cidercade",
            icon: "\ud83c\udfae",
            subtitle: "$12 unlimited arcade, 100+ games",
            mapsUrl: "https://maps.google.com/?q=Cidercade+Dallas",
          },
          {
            name: "The Free Man",
            icon: "\ud83c\udfb7",
            subtitle: "Jazz & blues, Cajun food",
            mapsUrl: "https://maps.google.com/?q=The+Free+Man+Dallas",
          },
          {
            name: "Three Links",
            icon: "\ud83c\udfb8",
            subtitle: "Punk/indie shows, cheap drinks",
            mapsUrl: "https://maps.google.com/?q=Three+Links+Dallas",
          },
          {
            name: "Dot Bar",
            icon: "\ud83c\udf78",
            subtitle: "Craft cocktails, chill rooftop",
            mapsUrl: "https://maps.google.com/?q=Dot+Bar+Dallas+Deep+Ellum",
          },
        ],
      },
    ],
  },
];
