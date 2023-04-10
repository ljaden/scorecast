// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { StandingsType } from "@/utils/types";

import { getStandings } from "@/utils/api/api";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandingsType>
) {
  // const data = await getStandings();
  try {
    const url = `https://stats.nba.com/stats/leaguestandingsv3?LeagueID=00&Season=2022-23&SeasonType=Regular%20Season&Section=overall`;
    // const url = `https://stats.nba.com/stats/leaguestandings?LeagueID=00&Season=2022-23&SeasonType=Regular+Season&SeasonYear=`;
    const { data: standings } = await axios.get(url, {
      headers: {
        Referer: "https://www.nba.com/standings",
        // Host: "stats.nba.com",
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

    res.status(200).json(data);
  } catch (error) {
    throw error;
  }
}
