import HowItWorksCard from "./Card/HowItWorksCard";
import StatCard from "./Card/StatCard";
import Section from "./Section";
import Image from "next/image";

const howItWorks = [
  {
    image: "/guides/step-1.jpg",
    description:
      "Create a new monitoring user for your loved one using the button on bottom left.",
    title: "Create",
  },
  {
    image: "/guides/step-2.png",
    description:
      "Copy the profile URL of the social media account of your loved one",
    title: "Copy",
  },
  {
    image: "/guides/step-3.png",
    description:
      "We will send an alert email if any of the posts is found to be depressive or suicidal.",
    title: "Alert",
  },
];

const HowItWorks = () => {
  return (
    <Section>
      <h2 className="mb-8 text-center text-4xl font-semibold" id="how-it-works">
        How it Works
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {howItWorks.map((val, ind) => {
          return <HowItWorksCard key={ind} {...val} />;
        })}
      </div>
    </Section>
  );
};

export default HowItWorks;
