import type { TeamStandings } from "@/utils/types";
import TeamLogo from "../TeamLogo/TeamLogo";

type Props = {
  standings: TeamStandings[];
};
const Standings = ({ standings }: Props) => {
  return (
    <div className="w-full text-center">
      <div className="overflow-hidden">
        <table className="table-fixed w-full">
          <thead className="border-b">
            <tr className="font-bold">
              <th className="w-3/12">NBA</th>
              <th className="">W</th>
              <th className="">L</th>
              <th className="">W%</th>
              <th className="">GP</th>
              <th className="">STRK</th>
              <th className="">L10</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr key={team.TeamID} className="py-2 border-b">
                <td className="flex items-center gap-4">
                  <span className="text-xs text-slate-500 pr-1">
                    {index + 1}
                  </span>
                  <TeamLogo teamId={team.TeamID} width={25} height={25} />
                  <span className="font-bold">{team.TeamName}</span>
                </td>
                <td>{team.WINS}</td>
                <td>{team.LOSSES}</td>
                <td>{team.WinPCT.toFixed(3).substring(1)}</td>
                <td>{team.WINS + team.LOSSES}</td>
                <td
                  className={`${team.CurrentStreak > 0 ? "text-green-700" : "text-rose-700"
                    }`}
                >
                  {team.strCurrentStreak}
                </td>
                <td>{team.L10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Standings;
