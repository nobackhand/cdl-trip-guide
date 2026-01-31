import { LINKS } from "@/lib/constants";

// Match data based on seeding
const upperQFs = [
  { seed1: 1, team1: "Paris", seed2: 8, team2: "Toronto KOI" },
  { seed1: 4, team1: "Carolina", seed2: 5, team2: "LA Thieves" },
  { seed1: 3, team1: "Riyadh", seed2: 6, team2: "OpTic Texas", isHomeTeam: true },
  { seed1: 2, team1: "FaZe Vegas", seed2: 7, team2: "G2 Minnesota" },
];

const lowerR1 = [
  { team1: "Loser QF1", team2: "Vancouver (12)" },
  { team1: "Loser QF2", team2: "Miami (9)" },
];

const lowerR2 = [
  { team1: "Loser QF3", team2: "Cloud9 NY (11)" },
  { team1: "Loser QF4", team2: "Boston (10)" },
];

function MatchBox({
  team1,
  team2,
  seed1,
  seed2,
  isHomeTeam,
  label
}: {
  team1: string;
  team2: string;
  seed1?: number;
  seed2?: number;
  isHomeTeam?: boolean;
  label?: string;
}) {
  return (
    <div className="rounded-sm bg-cod-dark2 border border-white/10 overflow-hidden">
      {label && (
        <div className="bg-white/5 px-2 py-0.5 text-[9px] text-cod-gray text-center border-b border-white/10">
          {label}
        </div>
      )}
      <div className={`flex items-center justify-between px-2 py-1.5 border-b border-white/5 ${isHomeTeam ? 'bg-cod-lime/10' : ''}`}>
        <span className={`text-[11px] ${isHomeTeam ? 'text-cod-lime font-semibold' : ''}`}>
          {seed1 && <span className="text-cod-gray mr-1">({seed1})</span>}
          {team1}
          {isHomeTeam && " 🏠"}
        </span>
      </div>
      <div className="flex items-center justify-between px-2 py-1.5">
        <span className="text-[11px]">
          {seed2 && <span className="text-cod-gray mr-1">({seed2})</span>}
          {team2}
        </span>
      </div>
    </div>
  );
}

function RoundLabel({ children, color = "lime" }: { children: React.ReactNode; color?: "lime" | "red" | "yellow" }) {
  const colorClass = {
    lime: "text-cod-lime border-cod-lime/30",
    red: "text-cod-red border-cod-red/30",
    yellow: "text-cod-yellow border-cod-yellow/30",
  }[color];

  return (
    <div className={`text-[10px] font-bold mb-2 pb-1 border-b ${colorClass}`}>
      {children}
    </div>
  );
}

export default function BracketView() {
  return (
    <>
      <div className="rounded-sm border-l-4 border-cod-green glass-card p-3">
        {/* Header */}
        <div className="mb-4 text-center">
          <div className="text-[13px] font-bold text-cod-lime">DOUBLE ELIMINATION BRACKET</div>
          <div className="text-[10px] text-cod-gray">12 Teams • $365K Prize Pool</div>
        </div>

        {/* Upper Bracket */}
        <div className="mb-4">
          <RoundLabel>UPPER BRACKET</RoundLabel>

          {/* Upper QFs - Thursday */}
          <div className="mb-1 text-[9px] text-cod-gray">Thu 29 - Quarterfinals</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {upperQFs.map((match, i) => (
              <MatchBox
                key={i}
                team1={match.team1}
                team2={match.team2}
                seed1={match.seed1}
                seed2={match.seed2}
                isHomeTeam={match.isHomeTeam}
              />
            ))}
          </div>

          {/* Upper SFs - Saturday */}
          <div className="mb-1 text-[9px] text-cod-gray">Sat 31 - Semifinals</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <MatchBox team1="Winner QF1" team2="Winner QF2" label="Upper SF 1" />
            <MatchBox team1="Winner QF3" team2="Winner QF4" label="Upper SF 2" />
          </div>

          {/* Upper Final - Sunday */}
          <div className="mb-1 text-[9px] text-cod-gray">Sun 1 - Upper Final</div>
          <div className="max-w-[200px] mx-auto">
            <MatchBox team1="Winner SF1" team2="Winner SF2" label="Upper Bracket Final" />
          </div>
        </div>

        {/* Connector */}
        <div className="flex items-center justify-center my-3">
          <div className="flex-1 h-px bg-white/20"></div>
          <div className="px-3 text-[9px] text-cod-gray">Losers drop down</div>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Lower Bracket */}
        <div className="mb-4">
          <RoundLabel color="red">LOWER BRACKET</RoundLabel>

          {/* Lower R1 - Friday */}
          <div className="mb-1 text-[9px] text-cod-gray">Fri 30 - Round 1</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {lowerR1.map((match, i) => (
              <MatchBox key={i} team1={match.team1} team2={match.team2} />
            ))}
          </div>

          {/* Lower R2 - Friday */}
          <div className="mb-1 text-[9px] text-cod-gray">Fri 30 - Round 2</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {lowerR2.map((match, i) => (
              <MatchBox key={i} team1={match.team1} team2={match.team2} />
            ))}
          </div>

          {/* Lower QFs - Saturday */}
          <div className="mb-1 text-[9px] text-cod-gray">Sat 31 - Lower Quarterfinals</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <MatchBox team1="LR1 Winner" team2="LR2 Winner" label="Lower QF 1" />
            <MatchBox team1="Upper SF Loser" team2="LR2 Winner" label="Lower QF 2" />
          </div>

          {/* Lower SF - Saturday */}
          <div className="mb-1 text-[9px] text-cod-gray">Sat 31 - Lower Semifinal</div>
          <div className="max-w-[200px] mx-auto mb-3">
            <MatchBox team1="LQF1 Winner" team2="LQF2 Winner" label="Lower Semifinal" />
          </div>

          {/* Lower Final - Sunday */}
          <div className="mb-1 text-[9px] text-cod-gray">Sun 1 - Lower Final</div>
          <div className="max-w-[200px] mx-auto">
            <MatchBox team1="Upper Final Loser" team2="Lower SF Winner" label="Lower Bracket Final" />
          </div>
        </div>

        {/* Grand Finals */}
        <div className="rounded-sm bg-gradient-to-r from-cod-yellow/20 to-cod-lime/20 border border-cod-yellow/30 p-3 text-center">
          <RoundLabel color="yellow">🏆 GRAND FINALS - SUNDAY 5 PM</RoundLabel>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center my-2">
            <div className="text-right">
              <div className="text-[10px] text-cod-gray">Upper Bracket</div>
              <div className="text-[12px] font-semibold">Winner</div>
            </div>
            <div className="text-[14px] font-bold text-cod-gray">vs</div>
            <div className="text-left">
              <div className="text-[10px] text-cod-gray">Lower Bracket</div>
              <div className="text-[12px] font-semibold">Winner</div>
            </div>
          </div>
          <div className="text-[10px] text-cod-gray mb-1">Best of 7 • Upper has 1-map advantage</div>
          <div className="text-[22px] font-bold text-cod-lime text-glow">$150,000</div>
        </div>
      </div>

      {/* Liquipedia Link */}
      <a
        href={LINKS.liquipedia}
        target="_blank"
        rel="noopener noreferrer"
        className="my-1.5 flex items-center gap-2.5 rounded-sm glass-card px-3 py-2.5 text-white no-underline card-lift active:border-cod-green/50 active:bg-cod-green/20"
      >
        <span className="w-7 text-center text-[18px]">📊</span>
        <div className="flex-1">
          <div className="text-[13px] font-semibold">Live Bracket on Liquipedia</div>
          <div className="text-[10px] text-cod-gray">Real-time scores & results</div>
        </div>
        <span className="text-cod-gray">→</span>
      </a>
    </>
  );
}
