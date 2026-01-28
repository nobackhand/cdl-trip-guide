"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/components/Toast";
import { predictionMatches, winnerOptions } from "@/data/teams";

export default function Predictions() {
  const [predictions, setPredictions] = useLocalStorage<Record<string, string>>(
    "cdl_predictions",
    {}
  );
  const { showToast } = useToast();

  function select(matchId: string, teamId: string) {
    setPredictions((prev) => ({ ...prev, [matchId]: teamId }));
    showToast("Prediction saved! \ud83c\udfaf");
  }

  return (
    <section id="predictions" className="my-5">
      <h2 className="mb-1 font-heading text-[16px] font-bold uppercase tracking-[6px] text-cod-orange">
        {"\ud83c\udfaf"} Your Predictions
      </h2>
      <div className="section-divider" />
      <p className="mb-3 text-[11px] text-cod-gray">
        Tap teams to pick winners - auto-saved!
      </p>

      {/* QF Matches */}
      <div className="mb-2.5 rounded-xl glass-card p-3">
        <div className="mb-2.5 text-[11px] font-semibold text-cod-cyan">
          UPPER BRACKET QFs (Thursday)
        </div>
        {predictionMatches.map((match) => (
          <div
            key={match.id}
            className={`mb-2 rounded-xl bg-white/5 p-2.5 last:mb-0 ${
              match.isHomeTeam ? "border border-cod-lime" : ""
            }`}
          >
            {match.isHomeTeam && (
              <div className="mb-1 text-[9px] text-cod-lime">
                {"\ud83c\udfe0"} HOME TEAM MATCH
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                onClick={() => select(match.id, match.team1Id)}
                className={`flex-1 cursor-pointer rounded-lg border-2 bg-transparent px-1 py-2.5 text-center text-white transition-all duration-200 active:bg-cod-dark2 ${
                  predictions[match.id] === match.team1Id
                    ? "border-cod-lime bg-[rgba(139,195,74,0.15)]"
                    : "border-transparent"
                }`}
              >
                <div className="text-[12px] font-semibold">{match.team1}</div>
              </button>
              <div className="text-[12px] font-bold text-cod-gray">vs</div>
              <button
                onClick={() => select(match.id, match.team2Id)}
                className={`flex-1 cursor-pointer rounded-lg border-2 bg-transparent px-1 py-2.5 text-center text-white transition-all duration-200 active:bg-cod-dark2 ${
                  predictions[match.id] === match.team2Id
                    ? "border-cod-lime bg-[rgba(139,195,74,0.15)]"
                    : "border-transparent"
                }`}
              >
                <div
                  className={`text-[12px] font-semibold ${
                    match.team2Id === "optic" ? "text-cod-lime" : ""
                  }`}
                >
                  {match.team2}
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tournament Winner */}
      <div className="rounded-xl glass-card p-3">
        <div className="mb-2.5 text-[11px] font-semibold text-cod-yellow">
          {"\ud83c\udfc6"} TOURNAMENT WINNER
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {winnerOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => select("winner", opt.id)}
              className={`cursor-pointer rounded-lg border-2 bg-transparent px-1 py-2.5 text-center text-white transition-all duration-200 active:bg-cod-dark2 ${
                predictions.winner === opt.id
                  ? "border-cod-lime bg-[rgba(139,195,74,0.15)]"
                  : "border-transparent"
              }`}
            >
              <div
                className={`text-[11px] font-semibold ${
                  opt.isHome ? "text-cod-lime" : ""
                }`}
              >
                {opt.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
