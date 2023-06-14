// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Rettiwt, Tweet } from "rettiwt-api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const rettiwt = Rettiwt();
    const { id, last_scanned } = req.query as {
      id: string;
      last_scanned: string;
    };

    const values: Tweet[] = [];
    const lastScanned = new Date(last_scanned);

    // Getting the tweets of the user using his rest id
    let tweets = await rettiwt.users.getUserTweets(id);
    let flag = true;
    while (flag) {
      if (values.length > 0) {
        tweets = await rettiwt.users.getUserTweets(id, 30, tweets.next.value);
      }

      for (const tweet of tweets.list) {
        if (new Date(tweet.createdAt).getTime() > lastScanned.getTime()) {
          values.push(tweet);
        } else {
          flag = false;
          break;
        }
      }
      if (tweets.list.length < 30) {
        flag = false;
      }
    }
    console.log(values);
    res.status(200).json({ tweets: values });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong, please try again" });
  }
}
