import HowItWorksCard from "./Card/HowItWorksCard";
import StatCard from "./Card/StatCard";
import Section from "./Section";
import Image from "next/image";

const howItWorks = ["", "", ""];

const HowItWorks = () => {
  return (
    <Section>
      <h2 className="mb-8 text-center text-4xl font-semibold" id="how-it-works">
        How it Works
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {howItWorks.map((val, ind) => {
          return <HowItWorksCard key={ind} />;
        })}
      </div>
    </Section>
  );
};

export default HowItWorks;
