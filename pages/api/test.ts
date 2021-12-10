import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function sendOtp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwt_secret = process.env.JWT_SECRET;
  console.log(
    jwt.verify(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdHAiOiI4NTAwNTUiLCJ1c2VybmFtZSI6IktyaWhzbmFhYSIsImlhdCI6MTYzOTE1NzIwNSwiZXhwIjoxNjM5MTU4MTA1fQ.7D0oEpRnf7ZTlLawy4HjeLB0UQPw6aox7TL3MJA_6-A",
      jwt_secret
    )
  );
}
