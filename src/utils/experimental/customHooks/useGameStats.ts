/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  LOCAL_HOST,
  GAMES_CONSTANT,
  GAME_INFO_API,
} from "../constants/propConstants";
import axios from "axios";
import { mapGameStats, createRequestBody } from "../helpers/mappingUtil";

export const useGameStats = (
  gamesOrPlayersFlag,
  selectedTeam,
  opposingTeamForGames,
  dates
) => {
  const [gameStats, setGameStats] = useState([]);
  const [isFetchingGameStats, setIsFetchingGameStats] = useState(false);
  const [isErrorGameStats, setIsErrorGameStats] = useState<boolean>(false);

  useEffect(() => {
    async function getGameStats() {
      const controller = new AbortController();

      try {
        const gameInfoUrl = LOCAL_HOST + GAME_INFO_API;
        const request = createRequestBody();
        addSelectedTeam(request, selectedTeam);
        addDates(request, dates);
        let mappedData;

        if (Object.keys(opposingTeamForGames).length > 0) {
          mappedData = addOpposingTeam([...gameStats], opposingTeamForGames);
        } else {
          setIsFetchingGameStats(true);
          let response = await axios.post(gameInfoUrl, request, {
            signal: controller.signal,
          });
          setIsFetchingGameStats(false);
          mappedData = mapGameStats(response.data);
        }
        setGameStats(mappedData);
      } catch (error: any) {
        console.log("usePlayerStats fetch error");
        setIsFetchingGameStats(false);
        setIsErrorGameStats(true);

        if (error.name === "AbortController") {
          console.log("Request Aborted");
        }
      }
    }

    if (gamesOrPlayersFlag === GAMES_CONSTANT) {
      getGameStats();
    }
  }, [selectedTeam, opposingTeamForGames, dates]);
  return [gameStats, setGameStats, isFetchingGameStats, isErrorGameStats];
};

function addSelectedTeam(request, selectedTeam) {
  if (Object.keys(selectedTeam).length > 0) {
    request["where"] = {
      or: {
        at_id: selectedTeam.team_id,
        ht_id: selectedTeam.team_id,
      },
    };
  }
}

function addOpposingTeam(gameStats, opposingTeamForGames) {
  return gameStats.filter((info) => {
    const { ht_full_name, at_full_name } = info;
    return (
      opposingTeamForGames.full_name === ht_full_name ||
      opposingTeamForGames.full_name === at_full_name
    );
  });
}

function addDates(request, dates) {
  if (dates.length > 0) {
    request["start_date"] = dates[0];
    request["end_date"] = dates[1];
  }
}
