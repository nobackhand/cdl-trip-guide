export interface ScheduleMatch {
  time: string;
  title: string;
  note: string;
  isHomeTeam?: boolean;
  isGrandFinal?: boolean;
}

export interface ScheduleDay {
  id: string;
  tabLabel: string;
  name: string;
  date: string;
  matches: ScheduleMatch[];
}

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  seed: number;
  bracket: "upper" | "lower";
  isHomeTeam?: boolean;
}

export interface PredictionMatch {
  id: string;
  team1: string;
  team2: string;
  team1Id: string;
  team2Id: string;
  isHomeTeam?: boolean;
}

export interface FoodSpot {
  name: string;
  icon: string;
  subtitle: string;
  mapsUrl: string;
}

export interface FoodCategory {
  title: string;
  icon: string;
  spots: FoodSpot[];
}

export interface FoodLocation {
  id: string;
  tabLabel: string;
  proTip?: { title: string; text: string };
  categories: FoodCategory[];
}

export interface UberDestination {
  icon: string;
  destination: string;
  cost: string;
  time: string;
  url?: string;
  action?: "copy";
  copyText?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface CostItem {
  icon: string;
  label: string;
  value: string;
  isFree?: boolean;
}
