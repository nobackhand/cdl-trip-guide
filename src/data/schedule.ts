import { ScheduleDay } from "@/lib/types";

export const scheduleDays: ScheduleDay[] = [
  {
    id: "thu",
    tabLabel: "Thu 29",
    name: "Thursday - Upper Bracket QFs",
    date: "Jan 29",
    matches: [
      { time: "12:30 PM", title: "Paris vs Toronto KOI", note: "Upper Bracket QF \u2022 Bo5" },
      { time: "2:00 PM", title: "Carolina vs LA Thieves", note: "Upper Bracket QF \u2022 Bo5" },
      {
        time: "3:30 PM",
        title: "Riyadh vs OpTic Texas",
        note: "Upper Bracket QF \u2022 Bo5 \u2022 HOME TEAM",
        isHomeTeam: true,
      },
      { time: "5:00 PM", title: "FaZe Vegas vs G2 Minnesota", note: "Upper Bracket QF \u2022 Bo5" },
    ],
  },
  {
    id: "fri",
    tabLabel: "Fri 30",
    name: "Friday - Lower Bracket",
    date: "Jan 30",
    matches: [
      { time: "12:30 PM", title: "TBD vs Vancouver Surge", note: "Lower Bracket R1 \u2022 Bo5" },
      { time: "2:00 PM", title: "TBD vs Miami Heretics", note: "Lower Bracket R1 \u2022 Bo5" },
      { time: "3:30 PM", title: "TBD vs Cloud9 New York", note: "Lower Bracket R2 \u2022 Bo5" },
      { time: "5:00 PM", title: "TBD vs Boston Breach", note: "Lower Bracket R2 \u2022 Bo5" },
    ],
  },
  {
    id: "sat",
    tabLabel: "Sat 31",
    name: "Saturday - Semifinals",
    date: "Jan 31",
    matches: [
      { time: "12:30 PM", title: "Lower Bracket QF", note: "Bo5" },
      { time: "2:00 PM", title: "Upper Bracket SF #1", note: "Bo5" },
      { time: "3:30 PM", title: "Upper Bracket SF #2", note: "Bo5" },
      { time: "5:00 PM", title: "Lower Bracket QF #2", note: "Bo5" },
      { time: "6:30 PM", title: "Lower Bracket SF", note: "Bo5" },
    ],
  },
  {
    id: "sun",
    tabLabel: "Sun 1",
    name: "Sunday - FINALS DAY",
    date: "Feb 1",
    matches: [
      { time: "12:30 PM", title: "Upper Bracket FINAL", note: "Winner to Grand Finals \u2022 Bo5" },
      { time: "2:00 PM", title: "Lower Bracket FINAL", note: "Loser eliminated \u2022 Bo5" },
      {
        time: "5:00 PM",
        title: "GRAND FINALS",
        note: "$150K Winner \u2022 Bo7",
        isGrandFinal: true,
      },
    ],
  },
];
