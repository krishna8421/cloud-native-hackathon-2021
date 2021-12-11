import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function sendOtp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
}
