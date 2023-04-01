import { useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

import type { GameType } from "@/utils/types";

import TeamLogo from "../TeamLogo/TeamLogo";

type Props = {
  gameId: string;
};

const Period = ({ gameId }: Props) => {
  const { data, isLoading } = useQuery<GameType>({
    queryKey: ["gameInfo", gameId],
    queryFn: () => axiosFetcher(`/api/game/${gameId}`),
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  const homeScore =
    data?.homeTeam.periods.reduce((total, period) => {
      return total + period.score;
    }, 0) ?? 0;
  const awayScore =
    data?.awayTeam.periods.reduce((total, period) => {
      return total + period.score;
    }, 0) ?? 0;

  return (
    <div>
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
              <TeamLogo
                teamId={data?.homeTeam.teamId ?? 1}
                width={30}
                height={30}
              />
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
            {/* homeTeamTotal */}
            <td className={`${homeScore > awayScore ? "font-extrabold" : ""}`}>
              {homeScore}
            </td>
          </tr>

          <tr>
            <td>
              <TeamLogo
                teamId={data?.awayTeam.teamId ?? 1}
                width={30}
                height={30}
              />
            </td>
            {data?.homeTeam.periods.map((period, i) => (
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
            {/* awayTeamTotal */}
            <td className={`${awayScore > homeScore ? "font-extrabold" : ""}`}>
              {awayScore}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Period;
