import { teams } from "@/data/teams";
import { LINKS } from "@/lib/constants";

export default function BracketView() {
  const upperTeams = teams.filter((t) => t.bracket === "upper");
  const lowerTeams = teams.filter((t) => t.bracket === "lower");

  return (
    <>
      <div className="rounded-xl border-l-4 border-cod-green glass-card p-4">
        <div className="mb-3 text-center">
          <div className="text-[13px] font-bold text-cod-orange">DOUBLE ELIMINATION</div>
          <div className="text-[10px] text-cod-gray">12 Teams &bull; $365K Prize Pool</div>
        </div>

        {/* Upper Bracket */}
        <div className="mb-4">
          <div className="mb-2 text-[11px] font-bold text-cod-lime">
            UPPER BRACKET (Seeds 1-8)
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            {upperTeams.map((t) => (
              <div key={t.id} className={t.isHomeTeam ? "text-cod-lime" : ""}>
                {"\ud83d\udd39"} {t.name} ({t.seed}){t.isHomeTeam ? " \ud83c\udfe0" : ""}
              </div>
            ))}
          </div>
        </div>

        {/* Lower Bracket */}
        <div className="mb-4">
          <div className="mb-2 text-[11px] font-bold text-cod-red">
            LOWER BRACKET (Seeds 9-12)
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            {lowerTeams.map((t) => (
              <div key={t.id}>
                {"\ud83d\udd38"} {t.name} ({t.seed})
              </div>
            ))}
          </div>
        </div>

        {/* Grand Finals */}
        <div className="rounded-lg bg-white/10 p-3 text-center">
          <div className="font-bold text-cod-yellow">{"\ud83c\udfc6"} GRAND FINALS</div>
          <div className="text-[11px]">Sunday 5 PM &bull; Best of 7</div>
          <div className="text-[20px] font-bold text-cod-lime text-glow">$150,000</div>
        </div>
      </div>

      <a
        href={LINKS.liquipedia}
        target="_blank"
        rel="noopener noreferrer"
        className="my-1.5 flex items-center gap-2.5 rounded-lg glass-card px-3 py-2.5 text-white no-underline card-lift active:border-cod-green/50 active:bg-cod-green/20"
      >
        <span className="w-7 text-center text-[18px]">{"\ud83d\udcca"}</span>
        <div className="flex-1">
          <div className="text-[13px] font-semibold">Live Bracket on Liquipedia</div>
          <div className="text-[10px] text-cod-gray">Real-time scores & stats</div>
        </div>
        <span className="text-cod-gray">{"\u2192"}</span>
      </a>
    </>
  );
}
