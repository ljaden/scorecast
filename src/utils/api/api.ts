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

      // dateParam = formattedDate;
      dateParam = `${20230120}`;
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

// * Fetch standings by Conference
export async function getStandingsByConf() {
  try {
    const conference = `https://www.espn.com/nba/standings/`;

    const res = await getHTML(conference);
    const data = filterStandings(res);

    return data;
  } catch (error) {
    throw error;
  }
}

// * Fetch overall standings of league
export async function getStandings() {
  try {
    const league = `https://www.espn.com/nba/standings/_/group/league`;

    const res = await getHTML(league);
    // console.log(res[0].standings, "res");
    const data = filterStandings(res);

    return data;
  } catch (error) {
    throw error;
  }
}

// * Fetch standings by Conference
export async function getStandingsByDiv() {
  try {
    const division = `https://www.espn.com/nba/standings/_/group/division`;

    const res = await getHTML(division);

    for (let i = 0; i < res.length; i++) {
      filterStandings(res[i].children);
    }

    return res;
  } catch (error) {
    throw error;
  }
}

// * Fetch Teams stats
export async function getTeams() {
  try {
    const url = `https://stats.nba.com/stats/leaguestandingsv3?LeagueID=00&Season=2023-24&SeasonType=Regular%20Season&Section=overall`;
    const { data: standings } = await axios.get(url, {
      headers: {
        Host: "stats.nba.com",
        Connection: "keep-alive",
        Accept: "application/json, text/plain, */*",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        Origin: "https://www.nba.com",
        Referer: "https://www.nba.com/",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.5",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Sec-GPC": "1",
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
      teams: result,
    };

    return data;
  } catch (error) {
    throw error;
  }
}

// * Fetch Teams Schedule
export async function getTeamSchedule(teamID) {
  try {
    const url = `https://stats.nba.com/stats/teamgamelog?DateFrom=&DateTo=&LeagueID=&Season=2023-24&SeasonType=Regular+Season&TeamID=${teamID}`;

    const data = await axios.get(url, {
      headers: {
        Host: "stats.nba.com",
        Connection: "keep-alive",
        Accept: "application/json, text/plain, */*",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        Origin: "https://www.nba.com",
        Referer: "https://www.nba.com/",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.5",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Sec-GPC": "1",
      },
    });

    const selectedHeaders = [
      "Team_ID",
      "Game_ID",
      "GAME_DATE",
      "MATCHUP",
      "WL",
      "W",
      "L",
      "W_PCT",
      "MIN",
      "FGM",
      "FGA",
      "FG_PCT",
      "FG3M",
      "FG3A",
      "FG3_PCT",
      "FTM",
      "FTA",
      "FT_PCT",
      "OREB",
      "DREB",
      "REB",
      "AST",
      "STL",
      "BLK",
      "TOV",
      "PF",
      "PTS",
    ];

    const { headers, rowSet } = data.data.resultSets[0];

    const result = rowSet.map((row: any) =>
      row.reduce((obj: any, val: any, i: number) => {
        if (selectedHeaders.includes(headers[i])) {
          obj[headers[i]] = val;
        }
        return obj;
      }, {})
    );

    // console.log(result, "here");

    return result;
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

function filterStandings(data: any) {
  type team = {
    stats: string[];
    team: {
      abbrev: string;
      displayName: string;
      id: string;
      links: string;
      location: string;
      logo: string;
      recordSummary: string;
      shortDisplayName: string;
      standingSummary: string;
      uid: string;
    };
  };
  for (let i = 0; i < data.length; i++) {
    //
    delete data[i]["notes"];

    data[i]["standings"].forEach((team: team, index: number) => {
      data[i]["standings"][index]["stats"] = {
        opp_ppg: team["stats"][0],
        ppg: team["stats"][1],
        diff: team["stats"][2],
        gb: team["stats"][4],
        losses: team["stats"][6],
        rank: team["stats"][7],
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
}
