import { Team, PredictionMatch } from "@/lib/types";

export const teams: Team[] = [
  { id: "paris", name: "Paris", abbreviation: "PAR", seed: 1, bracket: "upper" },
  { id: "faze", name: "FaZe Vegas", abbreviation: "FAZE", seed: 2, bracket: "upper" },
  { id: "riyadh", name: "Riyadh", abbreviation: "RIY", seed: 3, bracket: "upper" },
  { id: "carolina", name: "Carolina", abbreviation: "CAR", seed: 4, bracket: "upper" },
  { id: "lat", name: "LA Thieves", abbreviation: "LAT", seed: 5, bracket: "upper" },
  { id: "optic", name: "OpTic Texas", abbreviation: "OPTX", seed: 6, bracket: "upper", isHomeTeam: true },
  { id: "g2", name: "G2 Minnesota", abbreviation: "G2", seed: 7, bracket: "upper" },
  { id: "toronto", name: "Toronto KOI", abbreviation: "TOR", seed: 8, bracket: "upper" },
  { id: "miami", name: "Miami Heretics", abbreviation: "MIA", seed: 9, bracket: "lower" },
  { id: "boston", name: "Boston Breach", abbreviation: "BOS", seed: 10, bracket: "lower" },
  { id: "c9ny", name: "Cloud9 New York", abbreviation: "C9NY", seed: 11, bracket: "lower" },
  { id: "vancouver", name: "Vancouver Surge", abbreviation: "VAN", seed: 12, bracket: "lower" },
];

export const predictionMatches: PredictionMatch[] = [
  { id: "qf1", team1: "Paris", team2: "Toronto", team1Id: "paris", team2Id: "toronto" },
  { id: "qf2", team1: "Carolina", team2: "LA Thieves", team1Id: "carolina", team2Id: "lat" },
  { id: "qf3", team1: "Riyadh", team2: "OpTic", team1Id: "riyadh", team2Id: "optic", isHomeTeam: true },
  { id: "qf4", team1: "FaZe", team2: "G2", team1Id: "faze", team2Id: "g2" },
];

export const winnerOptions = [
  { id: "optic", name: "OpTic", isHome: true },
  { id: "faze", name: "FaZe" },
  { id: "paris", name: "Paris" },
  { id: "lat", name: "LAT" },
  { id: "riyadh", name: "Riyadh" },
  { id: "carolina", name: "Carolina" },
  { id: "g2", name: "G2" },
  { id: "other", name: "Other" },
];
