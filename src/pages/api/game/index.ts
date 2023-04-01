// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Scheduledata } from "@/utils/types";

import { getFullSchedule } from "@/utils/api/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Scheduledata>
) {
  // console.log(req.query);
  const data = await getFullSchedule();
  res.status(200).json(data);
}
