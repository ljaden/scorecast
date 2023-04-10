import axios from "axios";

import type { Scheduledata } from "@/utils/types";

// * Fetch complete 2022-2023 schedule
export async function getFullSchedule() {
  try {
    const { data } = await axios.get(
      "https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return data.leagueSchedule.gameDates;
  } catch (error) {
    throw error;
  }
}

// * Fetch scheduled games of dateParam
export async function getSchedule(dateParam?: string) {
  // * @params
  // * dateParam:string| undefined consist of date in YYYYMMDD format
  try {
    // assigns dateParam to current date if it's undefined
    if (!dateParam) {
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);

      const formattedDate = `${year}${month}${day}`;

      dateParam = formattedDate;
    }

    const { data } = await axios.get(
      "https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json"
    );

    const schedule = data.leagueSchedule.gameDates.find((i: Scheduledata) => {
      const date = new Date(i.gameDate);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);

      const formattedDate = `${year}${month}${day}`;

      return formattedDate === dateParam;
    });

    return schedule;
  } catch (error) {
    throw error;
  }
}

// * Fetch single game from Schedule
// export async function getSingleGame(gameId: string){
//   const res:Scheduledata = await getFullSchedule()
//
//   const singleGame = res.games.
//
//
// }

// * Fetch single game data
export async function getGameStats(gameId: string) {
  // * @params
  // * gameId:string gameId string
  try {
    const url = `https://cdn.nba.com/static/json/liveData/boxscore/boxscore_${gameId}.json`;

    const { data } = await axios.get(url);

    return data.game;
  } catch (error) {
    throw error;
  }
}

// Fetch standings
export async function getStandings() {
  try {
    const url = `https://stats.nba.com/stats/leaguestandingsv3?LeagueID=00&Season=2022-23&SeasonType=Regular%20Season&Section=overall`;
    // const url = `https://stats.nba.com/stats/leaguestandings?LeagueID=00&Season=2022-23&SeasonType=Regular+Season&SeasonYear=`;
    const { data: standings } = await axios.get(url, {
      headers: {
        Referer: "https://www.nba.com/standings",
      },
    });

    const selectedHeaders = [
      "TeamID",
      "TeamCity",
      "TeamName",
      "TeamSlug",
      "Conference",
      "ConferenceRecord",
      "PlayoffRank",
      "Division",
      "DivisionRank",
      "WINS",
      "LOSSES",
      "WinPCT",
      "HOME",
      "ROAD",
      "L10",
      "Last10Home",
      "Last10Road",
      "CurrentStreak",
      "strCurrentStreak",
    ];
    const { headers, rowSet } = standings.resultSets[0];

    const result = rowSet.map((row: any) =>
      row.reduce((obj: any, val: any, i: number) => {
        if (selectedHeaders.includes(headers[i])) {
          obj[headers[i]] = val;
        }
        return obj;
      }, {})
    );

    const data = {
      season: standings.parameters.SeasonYear,
      standings: result,
    };

    return data;
  } catch (error) {
    throw error;
  }
}
