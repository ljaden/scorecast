import type { NextApiRequest, NextApiResponse } from "next";
import type { GameType } from "@/utils/types";

import { getGameStats } from "@/utils/api/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GameType>
) {
  const { gameId } = req.query;

  try {
    if (typeof gameId === "string") {
      const data = await getGameStats(gameId);
      res.status(200).json(data);
    }
  } catch (error) {
    throw error;
  }
}
