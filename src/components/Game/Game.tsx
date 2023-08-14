import Image from "next/image";
import { useEffect, useState } from "react";

import type { ScheduleGameType, GameType } from "@/utils/types/index";

// rtk context
import type { RootState } from "@/RtkGlobals/store";
import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

// components
import TeamLogo from "../TeamLogo/TeamLogo";

const Game = ({
  gameId,
  gameDateTimeUTC,
  gameStatusText,
  gameStatus,
  homeTeam,
  awayTeam,
  broadcasters,
}: ScheduleGameType) => {
  const dateTimeUTC = useSelector((state: RootState) => state.date.dateTimeUTC);
  const [isLive, setIsLive] = useState<boolean>(
    new Date(dateTimeUTC) > new Date(gameDateTimeUTC) && gameStatus !== 3
  );

  const { data } = useQuery<GameType>({
    queryKey: ["gameInfo", gameId],
    queryFn: () => axiosFetcher(`/api/game/${gameId}`),
    refetchInterval: 10000,
    enabled: isLive,
  });

  useEffect(() => {
    if (data?.gameStatus === 3) {
      setIsLive(false);
    }
  }, [data]);

  const nationalTvBroadcasters =
    broadcasters?.nationalTvBroadcasters[0]?.broadcasterAbbreviation ?? false;

  return (
    <>
      <div className="flex justify-between items-center py-1.5 relative">
        {isLive && (
          <Image src="/live.svg" width={15} height={15} alt="live"></Image>
        )}
        <span className="mx-auto text-sm uppercase">
          {gameStatus === 1 || 3 ? gameStatusText : data?.gameStatusText}
        </span>
        {nationalTvBroadcasters && (
          <span className="text-gray-500 absolute right-0 hidden text-xs md:block">
            {nationalTvBroadcasters}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {/* awayTeam */}
        <div
          className={`flex items-center justify-between ${awayTeam.score > homeTeam.score ? "font-extrabold" : ""
            }`}
        >
          <div className="flex items-center gap-2 w-16">
            <TeamLogo teamId={awayTeam.teamId} width={25} height={25} />
            <span>
              {awayTeam.teamTricode}
              <span className="text-xs text-gray-500 font-normal absolute pl-0.5">
                ({awayTeam.wins}-{awayTeam.losses})
              </span>
            </span>
          </div>

          <span
            className={`flex-none ml-16 ${data && data?.awayTeam.score > data?.homeTeam.score
                ? "font-extrabold"
                : ""
              } `}
          >
            {data?.awayTeam.score ?? awayTeam.score !== 0 ? awayTeam.score : ""}
          </span>
        </div>
        {/* homeTeam */}
        <div
          className={`flex items-center justify-between ${homeTeam.score > awayTeam.score ? "font-extrabold" : ""
            }`}
        >
          <div className="flex items-center gap-2 w-16">
            <TeamLogo teamId={homeTeam.teamId} width={25} height={25} />
            <span>
              {homeTeam.teamTricode}
              <span className="text-xs text-gray-500 font-normal absolute pl-0.5">
                ({homeTeam.wins}-{homeTeam.losses})
              </span>
            </span>
          </div>
          <span
            className={`flex-none ml-16 ${data && data?.homeTeam.score > data?.awayTeam.score
                ? "font-extrabold"
                : ""
              } `}
          >
            {data?.homeTeam.score ?? homeTeam.score !== 0 ? homeTeam.score : ""}
          </span>
        </div>
      </div>
    </>
  );
};

export default Game;
