import type { ScheduleGameType } from "@/utils/types";
import { IoReturnDownBackOutline } from "react-icons/io5";

// components
import Team from "./Team";
import Period from "./Period";
import PlayerStats from "./PlayerStats";

import moment from "moment";

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
    <section className="">
      <div className="bg-white shadow-2xl">
        <div className="w-full text-center p-2 relative">
          <span className="absolute left-1 bottom-3.5 cursor-pointer">
            <IoReturnDownBackOutline onClick={returnHome} size={18} />
          </span>
          {gameCode && gameStatus === 1 ? (
            <span className="uppercase text-lg font-semibold">
              {gameCodeToDT(gameCode)}
              {gameStatusText}
            </span>
          ) : (
            <span className="uppercase text-lg font-semibold">
              {gameStatusText}
            </span>
          )}
        </div>
        <div className="grid grid-2 sm:grid-cols-2">
          <Team {...awayTeam} isHome={false} gameStatus={gameStatus} />
          <Team {...homeTeam} isHome={true} gameStatus={gameStatus} />
        </div>
        <div className="w-full text-center p-2 flex flex-col justify-center">
          <p>
            {arenaName}, {arenaCity}, {arenaState}
          </p>
        </div>
      </div>

      <div>
        {/* Display `Period` & `PlayerStats` components if game has began|ended */}
        {gameStatus !== 1 && (
          <div>
            <Period gameId={gameId} />
            <PlayerStats gameId={gameId} />
          </div>
        )}
      </div>
    </section>
  );
};

//
const gameCodeToDT = (gameCode: string) => {
  let date = gameCode.split("/")[0];
  return moment(date).format("ddd, MMM Do @ ");
};

export default Scoreboard;
