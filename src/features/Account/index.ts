import { z } from "zod";

export interface HasUserId {
  id: string;
}

export interface UserAccount extends HasUserId {
  name: string;
}

export interface UserAccountProps {
  user: UserAccount;
}

export interface UserSocialMediaAccount {
  id: string;
  username: string;
  type: SocialMediaType;
  url: string;
}

export interface UserSocialMediaAccountProps {
  account: UserSocialMediaAccount;
}

export type SocialMediaType = "reddit" | "facebook" | "instagram" | "twitter";

export const socialMediaAccountSchema = z
  .object({
    type: z.string(),
    url: z.string().url("Invalid URL"),
  })
  .superRefine(({ type, url }, ctx) => {
    let pattern = /.*/;
    switch (type) {
      case "twitter":
        pattern = /https:\/\/(www\.)?twitter\.com\/([a-zA-Z0-9_]+).*/;
        break;
      case "facebook":
        pattern = /https:\/\/(www\.)?instagram\.com\/([a-zA-Z0-9_]+).*/;
        break;
      case "instagram":
        pattern = /twitter\.com\/([A-Za-z0-9_]+)/;
        break;
    }
    if (!pattern.test(url)) {
      ctx.addIssue({
        path: ["url"],
        code: "custom",
        message: `Not a valid ${type} url`,
      });
    }
  });
