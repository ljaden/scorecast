import type { ScheduleGameType } from "@/utils/types";
import { IoReturnDownBackOutline } from "react-icons/io5";

// components
import Team from "./Team";
import Period from "./Period";
import PlayerStats from "./PlayerStats";

type Props = ScheduleGameType & {
  returnHome: () => void;
};

const Scoreboard = ({
  arenaCity,
  arenaName,
  arenaState,
  gameId,
  gameCode,
  gameStatus,
  gameStatusText,
  homeTeam,
  awayTeam,
  returnHome,
}: Props) => {
  return (
    <>
      <div className="w-full border border-black text-center p-2 relative">
        <span className="absolute left-1 cursor-pointer flex items-center">
          <IoReturnDownBackOutline onClick={returnHome} />
          <span className="invisible hover:visible">Back</span>
        </span>
        <span className="uppercase">{gameStatusText}</span>
      </div>
      <div className="grid grid-2 sm:grid-cols-2">
        <Team {...awayTeam} isHome={false} gameStatus={gameStatus} />
        <Team {...homeTeam} isHome={true} gameStatus={gameStatus} />
      </div>
      <div className="w-full border border-black text-center p-2 flex flex-col justify-center">
        <p>
          {arenaName}, {arenaCity}, {arenaState}
        </p>
      </div>

      {gameStatus !== 1 && <Period gameId={gameId} />}
      {gameStatus !== 1 && <PlayerStats gameId={gameId} />}

      {/**/}
      {gameStatus === 1 && <h1>UPCOMING GAME</h1>}
    </>
  );
};

export default Scoreboard;
