// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Rettiwt, Tweet } from "rettiwt-api";

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
    const { username, last_scanned } = req.query as {
      username: string;
      last_scanned: string;
    };

    const values: Tweet[] = [];
    const lastScanned = new Date();
    lastScanned.setFullYear(2000);
    console.log(username, lastScanned);

    // Getting the tweets of the user using his username
    let tweets = await rettiwt.tweets.getTweets(
      {
        // hashtags: ["twitter"],
        words: ["twitter"],
        // startDate: lastScanned.toISOString().split("T")[0],
      },
      15
    );
    let flag = true;
    while (flag) {
      if (values.length > 0) {
        tweets = await rettiwt.tweets.getTweets(
          { fromUsers: [username] },
          15,
          tweets.next.value
        );
      }

      for (const tweet of tweets.list) {
        if (new Date(tweet.createdAt).getTime() < lastScanned.getTime()) {
          values.push(tweet);
        } else {
          flag = false;
          break;
        }
      }
      if (tweets.list.length < 15) {
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
