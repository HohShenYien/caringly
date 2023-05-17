import StatCard from "./Card/StatCard";
import Section from "./Section";
import Image from "next/image";

const Stats = () => {
  return (
    <Section className="bg-rose-100/25">
      <div className="space-y-12">
        <div className="flex flex-row items-start justify-center">
          <StatCard
            title="Depression is Common"
            content={[
              "Approximately 280 million individuals globally are depressed.",
              "Every 1 out of 20 adults suffer from depression.",
            ]}
            link="https://www.who.int/news-room/fact-sheets/detail/depression"
          />
          <Image
            src="/img/hero/depression.png"
            alt="depression"
            width="320"
            height="320"
            className="relative -ml-8 mt-8 rounded-2xl"
          />
        </div>
        <div className="flex flex-row items-start justify-center">
          <Image
            src="/img/hero/suicide.png"
            alt="suicide"
            height="400"
            width="480"
            className="relative z-[2] -mr-8 rounded-2xl"
          />
          <div className="mt-8">
            <StatCard
              title="Depression can lead to Suicide"
              content={[
                "More than 700 000 people die due to suicide every year.",
                "Every 4 out of 100 depressives will suicide.",
              ]}
              link="https://www.who.int/news-room/fact-sheets/detail/suicide"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Stats;
