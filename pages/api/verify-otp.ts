import type { NextApiRequest, NextApiResponse } from "next";
import mongoDB from "../../lib/mongoDB";
import User from "../../models/User";
import jwt from "jsonwebtoken";

export default async function VerifyOtp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwt_secret = process.env.JWT_SECRET;
  await mongoDB();
  if (req.method === "GET") {
    res.send("Hey Welcome to Verify Otp API");
  } else if (req.method === "POST") {
    if (!req.body) {
      res.status(400).json({
        status: "error",
        error: "No Data Found",
      });
    }

    const { userOtp, tempOtpToken } = req.body.data;
    if (!userOtp || !tempOtpToken) {
      res.status(400).json({
        status: "error",
        error: "OTP not found",
      });
    }
    let decoded: any;

    if (!jwt_secret) {
      res.status(400).json({
        status: "error",
        error: "JWT Secret not found",
      });
    } else {
      try {
        decoded = jwt.verify(tempOtpToken, jwt_secret);
      } catch (e) {
        res.status(400).json({
          status: "error",
          error: "Invalid Token",
        });
      }
    }

    const { otp, username } = decoded;

    if (parseInt(otp, 10) === userOtp) {
      try {
        const updated = await User.updateOne(
          { username },
          { $set: { verified: true } }
        );

        if (updated.modifiedCount === 1) {
          res.status(200).json({
            status: "success",
            data: "OTP Verified",
          });
        }
      } catch (err) {
        res.status(400).json({
          status: "error",
          error: "User not found",
        });
      }
    } else {
      res.status(400).json({
        status: "error",
        error: "OTP not matched",
      });
    }
  }
}
