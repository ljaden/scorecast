import { useState } from "react";
import Image from "next/image";
import type { ScheduleGameType, GameType } from "@/utils/types";
import { IoReturnDownBackOutline } from "react-icons/io5";

// components
import Team from "./Team";
import Period from "./Period";
import PlayerStats from "./PlayerStats";

import moment from "moment";

import { useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

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
  const [isLive, setIsLive] = useState<boolean>(false);

  const { data } = useQuery<GameType>({
    queryKey: ["gameInfo", gameId],
    queryFn: () => axiosFetcher(`/api/game/${gameId}`),
    refetchInterval: (data) => (data?.gameStatus === 2 ? 10000 : false),
    onSuccess: (data) => setIsLive(data.gameStatus === 2),
    enabled: isLive,
  });

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
              {isLive ? (
                <>
                  {data?.gameStatusText}

                  <span className="absolute left-25 bottom-3.5 px-2">
                    <Image
                      src="/live.svg"
                      width={15}
                      height={15}
                      alt="live"
                    ></Image>
                  </span>
                </>
              ) : (
                gameStatusText
              )}
            </span>
          )}
        </div>
        <div className="grid grid-2 sm:grid-cols-2">
          <Team
            {...awayTeam}
            isHome={false}
            gameStatus={gameStatus}
            liveScore={data?.awayTeam.score}
          />
          <Team
            {...homeTeam}
            isHome={true}
            gameStatus={gameStatus}
            liveScore={data?.homeTeam.score}
          />
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
