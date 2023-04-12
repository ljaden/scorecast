import type { Team } from "@/utils/types/index";

import TeamLogo from "../TeamLogo/TeamLogo";

type Props = Team & {
  isHome: boolean;
  gameStatus: number;
};

const Team = ({
  isHome,
  gameStatus,
  teamTricode,
  teamId,
  wins,
  losses,
  teamCity,
  teamName,
  score,
}: Props) => {
  return (
    <div
      className={`min-w-full py-6 px-4 flex ${isHome ? "" : "sm:flex-row-reverse"
        } justify-between items-center text-white ${teamTricode}-color`}
    >
      <div
        className={`flex ${isHome ? "" : "sm:flex-row-reverse"
          } gap-4 items-center justify-evenly`}
      >
        <TeamLogo teamId={teamId} width={60} height={60} />

        <div className="flex flex-col items-center">
          {!isNaN(wins) && (
            <span className="text-sm">
              ({wins}-{losses})
            </span>
          )}
          <span className="text-2xl font-bold text-center">{teamCity}</span>
          <span className="text-2xl font-bold text-center">{teamName}</span>
        </div>
      </div>
      <span
        className={`${gameStatus === 1 ? "hidden" : ""
          } text-3xl font-extrabold transition-colors duration-700 ease-in-out transform`}
      >
        {score}
      </span>
    </div>
  );
};

export default Team;
