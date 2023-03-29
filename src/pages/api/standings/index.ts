// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { StandingsType } from "@/utils/types";

import { getStandings } from "@/utils/api/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandingsType>
) {
  // console.log(req.query);
  const data = await getStandings();
  res.status(200).json(data);
}
