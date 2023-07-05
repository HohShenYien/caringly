import type { NextApiRequest, NextApiResponse } from "next";
import { Rettiwt } from "rettiwt-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const rettiwt = Rettiwt({
      auth_token: process.env.TWITTER_AUTH_TOKEN ?? "",
      ct0: process.env.TWITTER_CT0 ?? "",
      kdt: process.env.TWITTER_KDT ?? "",
      twid: process.env.TWITTER_TWID ?? "",
    });
    const { username } = req.query as { username: string };

    const user = await rettiwt.users.getUserDetails(username);
    console.log(user);
    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong, please try again" });
  }
}
