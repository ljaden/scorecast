import type { NextApiRequest, NextApiResponse } from "next";
import type { Scheduledata } from "@/utils/types";

import { getSchedule } from "@/utils/api/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Scheduledata>
) {
  const { date } = req.query;

  let dateQuery: string | undefined =
    typeof date === "string" ? date : undefined;

  const data = await getSchedule(dateQuery);
  res.status(200).json(data);
}
