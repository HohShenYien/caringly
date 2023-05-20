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
