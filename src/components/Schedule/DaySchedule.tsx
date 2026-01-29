import { ScheduleDay } from "@/lib/types";

export default function DaySchedule({ day }: { day: ScheduleDay }) {
  return (
    <div className="mb-2 overflow-hidden rounded-sm glass-card">
      <div className="flex items-center justify-between bg-white/5 px-3 py-2.5">
        <span className="text-[14px] font-bold">{day.name}</span>
        <span className="text-[11px] text-cod-lime">{day.date}</span>
      </div>
      <div className="p-3">
        {day.matches.map((match, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${
              i < day.matches.length - 1
                ? "mb-2.5 border-b border-cod-dark2 pb-2.5"
                : ""
            }`}
          >
            <div className="min-w-[60px] text-[11px] font-semibold text-cod-lime">
              {match.time}
            </div>
            <div>
              <div
                className={`text-[13px] font-semibold ${
                  match.isHomeTeam ? "text-cod-lime" : match.isGrandFinal ? "text-[15px] text-cod-yellow" : ""
                }`}
              >
                {match.isHomeTeam && "\ud83c\udfe0 "}
                {match.isGrandFinal && "\ud83c\udfc6 "}
                {match.title}
              </div>
              <div className="text-[11px] text-cod-gray">{match.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
