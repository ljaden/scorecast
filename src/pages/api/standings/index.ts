// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { StandingsType } from "@/utils/types";

// import { getStandings } from "@/utils/api/api";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandingsType>
) {
  // console.log(req.query);
  // const data = await getStandings();
  const url = `https://stats.nba.com/stats/leaguestandings?LeagueID=00&Season=2022-23&SeasonType=Regular+Season&SeasonYear=`;
  const { data: standings } = await axios.get(url, {
    headers: {
      Host: "stats.nba.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0",
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      "x-nba-stats-origin": "stats",
      "x-nba-stats-token": "true",
      Connection: "keep-alive",
      Referer: "https://stats.nba.com/",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
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

  console.log(data);
  res.status(200).json(data);
}
