// components
import Link from "next/link";

import TeamLogo from "@/components/TeamLogo/TeamLogo";

type Props = {
  TeamID: number;
  TeamCity: string;
  TeamName: string;
  TeamSlug: string;
  Conference: string;
  ConferenceRecord: string;
  PlayoffRank: number;
  Division: string;
  DivisionRank: number;
  WINS: number;
  LOSSES: number;
  WinPCT: number;
  HOME: string;
  ROAD: string;
  L10: string;
  Last10Home: string;
  Last10Road: string;
  CurrentStreak: number;
  strCurrentStreak: string;
};

const TeamsGrid = ({ teams }: Props) => {
  // console.log(teams);
  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-5">
      {teams.map((team) => (
        <div
          key={team.TeamID}
          className="flex justify-center transition-transform duration-300 cursor-pointer hover:scale-150 "
        >
          <Link href={`/teams/${team.TeamSlug}`}>
            <TeamLogo teamId={team.TeamID} width={100} height={100} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TeamsGrid;
