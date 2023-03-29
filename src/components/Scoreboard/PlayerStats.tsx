import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import axiosFetcher from "@/utils/api/axiosFetcher";

import type { GameType } from "@/utils/types";
import type { Player } from "@/utils/types";

type Props = {
  gameId: string;
};
const PlayerStats = ({ gameId }: Props) => {
  const [displayHome, setDisplayHome] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[] | undefined>(undefined);

  const { data, isLoading } = useQuery<GameType>({
    queryKey: ["gameInfo", gameId],
    queryFn: () => axiosFetcher(`/api/game/${gameId}`),
    onSuccess: (data) => setPlayers(data.awayTeam.players),
  });

  useEffect(() => {
    setPlayers(displayHome ? data?.homeTeam.players : data?.awayTeam.players);
  }, [displayHome]);

  return (
    <>
      <div className="flex justify-center mt-2">
        <button
          className={`${!displayHome
              ? `${data?.awayTeam.teamTricode}-color text-white`
              : "text-gray-800"
            }  font-bold py-2 px-8 rounded hover:scale-110 transition duration-200 ease-in-out`}
          onClick={() => setDisplayHome(false)}
        >
          {data?.awayTeam.teamName}
        </button>
        <button
          className={`${displayHome
              ? `${data?.homeTeam.teamTricode}-color text-white`
              : "text-gray-800"
            } font-bold py-2 px-8 rounded hover:scale-110 transition duration-200 ease-in-out`}
          onClick={() => setDisplayHome(true)}
        >
          {data?.homeTeam.teamName}
        </button>
      </div>
      <div className="flex flex-col text-center">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr className="">
                    <th className=""></th>
                    <th className="font-medium text-gray-900 p-2">Players</th>
                    <th className="font-medium text-gray-900 p-2">Mins</th>
                    <th className=" font-medium text-gray-900 p-2">FG%</th>
                    <th className=" font-medium text-gray-900 p-2">FT%</th>
                    <th className=" font-medium text-gray-900 p-2">3P</th>
                    <th className=" font-medium text-gray-900 p-2">PTS</th>
                    <th className=" font-medium text-gray-900 p-2">REB</th>
                    <th className="font-medium text-gray-900 p-2">AST</th>
                    <th className=" font-medium text-gray-900 p-2">STL</th>
                    <th className=" font-medium text-gray-900 p-2">BLK</th>
                    <th className=" font-medium text-gray-900 p-2">TO</th>
                  </tr>
                </thead>
                <tbody>
                  {players &&
                    players
                      .filter((player) => player.status === "ACTIVE")
                      .map((player) => (
                        <tr
                          key={player.personId}
                          className="text-md bg-white border-b transition duration-300 ease-in-out hover:bg-gray-200"
                        >
                          <td>
                            {player.oncourt === "1" && (
                              <small className=" font-bold">
                                {player.jerseyNum}
                              </small>
                            )}
                          </td>
                          <td className="whitespace-nowrap font-medium py-2">
                            <span>{player.name}</span>
                          </td>
                          <td className="">
                            <span>
                              {parseInt(
                                player.statistics.minutesCalculated
                                  .replace("PT", "")
                                  .replace("M", "")
                              )}
                            </span>
                          </td>
                          <td>
                            <span>
                              {`${player.statistics.fieldGoalsMade}/${player.statistics.fieldGoalsAttempted}`}
                            </span>
                          </td>
                          <td>
                            <span>
                              {`${player.statistics.freeThrowsMade}/${player.statistics.freeThrowsAttempted}`}
                            </span>
                          </td>
                          <td>
                            <span>{player.statistics.threePointersMade}</span>
                          </td>
                          <td>
                            <span>{player.statistics.points}</span>
                          </td>
                          <td>
                            <span>{player.statistics.reboundsTotal}</span>
                          </td>
                          <td>
                            <span>{player.statistics.assists}</span>
                          </td>
                          <td>
                            <span>{player.statistics.steals}</span>
                          </td>
                          <td>
                            <span>{player.statistics.blocks}</span>
                          </td>
                          <td>
                            <span>{player.statistics.turnovers}</span>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <small>Inactive: </small>
        {players &&
          players
            .filter((player) => player.status === "INACTIVE")
            .map((player) => player.nameI)
            .map((name) => (
              <small key={name} className="text-gray-400">
                {name},{" "}
              </small>
            ))}
      </div>
    </>
  );
};

export default PlayerStats;
