import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import mongoDB from "../../lib/mongoDB";
import User from "../../models/User";
import jwt from "jsonwebtoken";
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const generateOTP = () => {
  let digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const sendOtp = async (res: NextApiResponse, number: string) => {
  res.setHeader("Content-Type", "application/json");
  const destinationNumber = number;
  const otp = generateOTP();
  const messageConfig = {
    body: "OTP For CNH : " + otp,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: destinationNumber,
  };
  const message = await client.messages.create(messageConfig);

  if (!message.sid) {
    res.status(500).json({
      status: "error",
      error: "Server ERR, Cannot Send Msg at this time.",
    });
    return;
  }
  return otp;
};

const saveToDB = async (
  username: string,
  number: string,
  password: string,
  res: NextApiResponse
) => {
  const jwt_secret = process.env.JWT_SECRET;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, password: hashedPassword, number });

  if (!jwt_secret) {
    res.status(500).json({
      status: "error",
      error: "Server ERR, JWT Secret not found.",
    });
    return;
  } else {
    newUser
      .save()
      .then(async () => {
        const otp = await sendOtp(res, number);
        res.status(200).json({
          status: "success",
          error: null,
          token: jwt.sign({ username, number }, jwt_secret, {
            expiresIn: "2d",
          }),
          otp_token: jwt.sign({ otp, username }, jwt_secret, {
            expiresIn: "15m",
          }),
        });
      })
      .catch((err: any) => {
        res.status(400).json({
          status: "error",
          error: err,
        });
      });
  }
};

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoDB();
  if (req.method === "GET") {
    res.send("Hey Welcome to Register API");
  } else if (req.method === "POST") {
    if (!req.body) {
      res.status(400).json({
        status: "error",
        error: "No Data Found",
      });
      return;
    }
    const { username, number, password } = req.body.data;

    if (!username || !number || !password) {
      res.status(400).json({
        status: "error",
        error: "Please fill all the fields",
      });
      return;
    }

    await User.findOne({ username })
      .then((userExists) => {
        if (userExists) {
          res.status(400).json({
            status: "error",
            error: "User already exists",
          });
        } else {
          saveToDB(username, number, password, res);
        }
      })
      .catch((err) => {
        res.status(400).json({
          status: "error",
          error: "Server Error",
        });
      });
  }
}
