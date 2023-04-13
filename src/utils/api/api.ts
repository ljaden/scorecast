import axios from "axios";

import type { Scheduledata } from "@/utils/types";
import type { Standings } from "@/pages/standings/index";

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

// Fetch standings by Conference
export async function getStandingsByConf() {
  try {
    const conference = `https://www.espn.com/nba/standings/`;
    // const league = `https://www.espn.com/nba/standings/_/group/league`;
    // const division = `https://www.espn.com/nba/standings/_/group/league`;

    const data = await getHTML(conference);
    //
    for (let i = 0; i < data.length; i++) {
      // drop empty `note` property
      delete data[i]["notes"];
      //
      data[i]["standings"].forEach((team: any, index: number) => {
        data[i]["standings"][index]["stats"] = {
          opp_ppg: team["stats"][0],
          ppg: team["stats"][1],
          diff: team["stats"][3],
          gb: team["stats"][5],
          losses: team["stats"][7],
          rank: team["stats"][8],
          streak: team["stats"][9],
          pct: team["stats"][10],
          wins: team["stats"][11],
          record: team["stats"][12],
          home_record: team["stats"][13],
          away_record: team["stats"][14],
          div_record: team["stats"][15],
          conf_record: team["stats"][16],
          l10: team["stats"][17],
        };
      });
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function getHTML(url: string) {
  // fetch HTML site and parse out `standings table`
  const { data } = await axios.get(url);

  let json = data.substring(data.search(`{"app":`), data.length);
  json = json.substring(0, json.search(`};`) + 1);
  json = JSON.parse(json);
  json = json.page.content.standings.groups.groups;

  return json;
}
