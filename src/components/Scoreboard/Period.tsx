import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

import type { GameType, Period } from "@/utils/types";

import TeamLogo from "../TeamLogo/TeamLogo";

type Props = {
  gameId: string;
};

const calcTotal = (scores: Period[]) => {
  return scores.reduce((total, period) => {
    return total + period.score;
  }, 0);
};

const Period = ({ gameId }: Props) => {
  const { data } = useQuery<GameType>({
    queryKey: ["gameInfo", gameId],
    queryFn: () => axiosFetcher(`/api/game/${gameId}`),
  });

  const homeScore = useMemo(
    () => calcTotal(data?.homeTeam.periods ?? []) ?? 0,
    [data?.homeTeam.periods]
  );

  const awayScore = useMemo(
    () => calcTotal(data?.awayTeam.periods ?? []) ?? 0,
    [data?.awayTeam.periods]
  );

  return (
    <div className="py-5">
      {/* periods */}
      <table className="w-4/6 mx-auto mt-4 text-center">
        <thead className="border-b-2 border-black">
          <tr className="my-4">
            <th></th>
            {Array.from({ length: data?.period ?? 3 }, (_, index) => index).map(
              (period) =>
                period > 3 ? (
                  <th key={period}>OT</th>
                ) : (
                  <th key={period}>{period + 1}</th>
                )
            )}
            <th>T</th>
          </tr>
        </thead>
        <tbody className="text-lg">
          <tr>
            <td className="text-center">
              <span className="font-semibold">
                {data?.awayTeam.teamTricode}
              </span>
            </td>
            {data?.awayTeam.periods.map((period, i) => (
              <td
                key={period.period}
                className={`${period.score > data.homeTeam.periods[i].score
                    ? "font-extrabold"
                    : ""
                  }`}
              >
                {period.score > 0 ? period.score : "-"}
              </td>
            ))}
            {/* homeTeamTotal */}
            <td className={`${homeScore > awayScore ? "font-extrabold" : ""}`}>
              {awayScore}
            </td>
          </tr>

          <tr>
            <td>
              <span className="font-semibold">
                {data?.homeTeam.teamTricode}
              </span>
            </td>
            {data?.homeTeam.periods.map((period, i) => (
              <td
                key={period.period}
                className={`${period.score > data.awayTeam.periods[i].score
                    ? "font-extrabold"
                    : ""
                  }`}
              >
                {period.score > 0 ? period.score : "-"}
              </td>
            ))}
            {/* awayTeamTotal */}
            <td className={`${awayScore > homeScore ? "font-extrabold" : ""}`}>
              {homeScore}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Period;
