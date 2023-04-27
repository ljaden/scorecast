/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { mapPlayerStats, createRequestBody } from "../helpers/mappingUtil";
import {
  LOCAL_HOST,
  PLAYER_STATS_API,
  PLAYERS_CONSTANT,
} from "../constants/propConstants";

export const usePlayerStats = (
  gamesOrPlayersFlag,
  selectedPlayer,
  opposingTeam,
  dates
) => {
  const [playerStats, setPlayerStats] = useState([]);
  const [isFetchingPlayerStats, setIsFetchingPlayerStats] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    async function getPlayerStats() {
      const controller = new AbortController();
      try {
        const playerStatsUrl = LOCAL_HOST + PLAYER_STATS_API;
        const request = createRequestBody();
        addSelectedPlayer(request, selectedPlayer);
        addOpposingTeam(request, opposingTeam);
        addDates(request, dates);
        setIsFetchingPlayerStats(true);
        const { data } = await axios.post(playerStatsUrl, request, {
          signal: controller.signal,
        });
        setIsFetchingPlayerStats(false);
        const mappedData = mapPlayerStats(data);
        setPlayerStats(mappedData);
      } catch (error: any) {
        console.log("usePlayerStats fetch error");
        setIsFetchingPlayerStats(false);
        setIsError(true);
        if (error.name === "AbortController") {
          console.log("Request Aborted");
        }
      }

      controller.abort();
    }

    if (gamesOrPlayersFlag === PLAYERS_CONSTANT) {
      getPlayerStats();
    }
  }, [selectedPlayer, opposingTeam, dates]);

  return [playerStats, setPlayerStats, isFetchingPlayerStats, isError];
};

function addWhereClause(request, condition) {
  if (request["where"] && request["where"]["and"]) {
    request["where"]["and"] = { ...request["where"]["and"], ...condition };
  } else {
    request["where"] = { and: { ...condition } };
  }
}

function addSelectedPlayer(request, selectedPlayer) {
  if (selectedPlayer.player_id !== null) {
    addWhereClause(request, { player_id: selectedPlayer.player_id });
  }
}

function addOpposingTeam(request, opposingTeam) {
  if (opposingTeam.team_id != null) {
    addWhereClause(request, {
      opposing_team_id: opposingTeam.team_id,
    });
  }
}

function addDates(request, dates) {
  if (dates.length > 0) {
    request["start_date"] = dates[0];
    request["end_date"] = dates[1];
  }
}
