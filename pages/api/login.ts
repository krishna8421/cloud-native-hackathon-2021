import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import mongoDB from "../../lib/mongoDB";
import User from "../../models/User";
import jwt from "jsonwebtoken";

const passwordCompare = async (
  username: string,
  password: string,
  dbPassword: string,
  number: string,
  res: NextApiResponse
) => {
  const jwt_secret = process.env.JWT_SECRET;

  if (await bcrypt.compare(password, dbPassword)) {
    if (jwt_secret) {
      res.status(200).json({
        status: "success",
        error: null,
        token: jwt.sign({ username, number }, jwt_secret, {
          expiresIn: "2d",
        }),
      });
    } else {
      res.status(200).json({
        status: "error",
        error: "Server Error, JWT_SECRET is not defined",
      });
    }
  } else {
    res.status(400).json({
      status: "error",
      error: "Invalid username or password",
    });
  }
};

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await mongoDB();
  if (req.method === "GET") {
    res.send("Hey Welcome to Login API");
  } else if (req.method === "POST") {
    if (!req.body) {
      res.status(400).json({
        status: "error",
        error: "No Data Found",
      });
    }
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({
        status: "error",
        error: "Please fill all the fields",
      });
    }

    type UserType = {
      _id: string;
      username: string;
      number: string;
      password: string;
      verified: boolean;
      __v: number;
    };
    User.findOne({ username }, (err: any, user: UserType) => {
      if (err) {
        res.status(400).json({
          status: "error",
        });
      }
      if (!user) {
        res.status(400).json({
          status: "error",
          error: "User not found",
        });
      }

      const { password: dbPassword, number } = user;
      passwordCompare(username, password, dbPassword, number, res);
    });
  }
}
