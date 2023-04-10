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
    <section className="">
      <div className="bg-white shadow-2xl">
        <div className="w-full text-center p-2 relative">
          <span className="absolute left-1 cursor-pointer flex items-center">
            <IoReturnDownBackOutline onClick={returnHome} />
            {/* <span className="invisible hover:visible">Back</span> */}
          </span>
          <span className="uppercase text-lg font-semibold">
            {gameStatusText}
          </span>
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

        {/**/}
        {gameStatus === 1 && <h1>UPCOMING GAME</h1>}
      </div>
    </section>
  );
};

export default Scoreboard;
