import StatCard from "./Card/StatCard";
import Section from "./Section";

const Stats = () => {
  return (
    <Section>
      <div>
        <div>
          <div>
            <StatCard
              title="Depression is Common"
              content={[
                "Approximately 280 million individuals globally are depressed.",
                "Every 1 out of 20 adults suffer from depression.",
              ]}
              link=""
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Stats;
