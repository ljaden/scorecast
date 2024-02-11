// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { StandingsType } from "@/utils/types";

import { getTeams } from "@/utils/api/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StandingsType>
) {
  const data = await getTeams();
  res.status(200).json(data);
}
