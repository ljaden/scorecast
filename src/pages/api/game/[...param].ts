import type { NextApiRequest, NextApiResponse } from "next";
import type { GameType, ScheduleGameType } from "@/utils/types";

import { getGameStats } from "@/utils/api/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameType | ScheduleGameType>
) {
  const { param } = req.query;
  let gameId: string = "";
  let date: string = "";

  if (Array.isArray(param) && param.length > 0) {
    gameId = param[0];
    date = param[1];
  }

  try {
    const data = await getGameStats(gameId);
    res.status(200).json(data);
  } catch (error) {
    throw error;
  }
}
