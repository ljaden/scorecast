import type { NextApiRequest, NextApiResponse } from "next";
import type { GameType } from "@/utils/types";

import { getGameStats } from "@/utils/api/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameType>
) {
  const { gameId } = req.query;
  try {
    const data = await getGameStats(gameId);
    console.log(req.query);
    res.status(200).json(data);
  } catch (error) { }
}
