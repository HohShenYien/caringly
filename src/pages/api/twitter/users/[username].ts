import type { NextApiRequest, NextApiResponse } from "next";
import { Rettiwt } from "rettiwt-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const rettiwt = Rettiwt();
    const { username } = req.query as { username: string };

    const user = await rettiwt.users.getUserDetails(username);
    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong, please try again" });
  }
}
