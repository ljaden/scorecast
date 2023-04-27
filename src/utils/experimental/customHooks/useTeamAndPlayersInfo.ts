import { useState, useEffect } from "react";
import {
  LOCAL_HOST,
  PLAYER_INFO_API,
  TEAM_INFO_API,
} from "../constants/propConstants";
import { mapPlayerInfo, mapTeamInfo } from "../helpers/mappingUtil";

import axios from "axios";

export const useTeamAndPlayersInfo = () => {
  const [playerInfo, setPlayerInfo] = useState([]);
  const [teamInfo, setTeamInfo] = useState([]);

  const playerInfoUrl = LOCAL_HOST + PLAYER_INFO_API;
  const teamInfoUrl = LOCAL_HOST + TEAM_INFO_API;
  useEffect(() => {
    async function getData() {
      console.log("Calling API");

      try {
        const request = {
          where: {},
          orderBy: {},
        };
        const dataPoints = await Promise.all([
          axios.post(playerInfoUrl, request),
          axios.post(teamInfoUrl, request),
        ]);
        setPlayerInfo(mapPlayerInfo(dataPoints[0].data));
        const test = mapTeamInfo(dataPoints[1].data);
        setTeamInfo(test);
      } catch (error) {
        console.log("Something went wrong.");
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    }
    getData();
  }, [playerInfoUrl, teamInfoUrl]);

  return [playerInfo, teamInfo];
};
