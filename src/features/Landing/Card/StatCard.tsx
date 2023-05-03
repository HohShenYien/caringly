import { List } from "@mantine/core";

interface StatCardProps {
  title: string;
  content: string[];
  link: string;
}

const StatCard = ({ title, content, link }: StatCardProps) => {
  return (
    <div className="rounded-lg bg-indigo-100/90 px-12 py-16">
      <h3 className="text-2xl">{title}</h3>
      <List spacing="xs">
        {content.map((text, key) => (
          <List.Item key={key} className="text-slate-600">
            {text}
          </List.Item>
        ))}
      </List>
      <p>Learn More</p>
    </div>
  );
};

export default StatCard;
