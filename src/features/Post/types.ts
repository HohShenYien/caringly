export type Post = {
  id: string;
  text: string;
  category: "neutral" | "suicide" | "depression";
  type: "facebook" | "instagram" | "reddit";
  url: string;
};
