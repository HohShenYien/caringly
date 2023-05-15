import Quote from "@/components/icons/Quote";
import ArrowLink from "@/components/links/ArrowLink/ArrowLink";
import { List } from "@mantine/core";

interface StatCardProps {
  title: string;
  content: string[];
  link: string;
}

const StatCard = ({ title, content, link }: StatCardProps) => {
  return (
    <div className="relative max-w-lg space-y-3 rounded-2xl bg-indigo-100/90 px-16 pb-16 pt-20">
      <div
        style={{ fontFamily: "Times New Roman" }}
        className="absolute left-16 top-12 text-6xl font-bold text-indigo-600/25"
      >
        {"“"}
      </div>
      <h3 className="text-2xl">{title}</h3>
      <List spacing="0" className="list-disc">
        {content.map((text, key) => (
          <List.Item key={key} className="text-slate-600">
            {text}
          </List.Item>
        ))}
      </List>
      <div>
        <ArrowLink href={link}>Learn More</ArrowLink>
      </div>
    </div>
  );
};

export default StatCard;
