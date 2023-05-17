import Image from "next/image";

const HowItWorksCard = () => {
  return (
    <div className="px-4">
      <div className="mb-4 flex flex-col items-center justify-center space-y-2">
        <Image
          src="/img/hero/depression.png"
          height="250"
          width="250"
          alt=""
          className="rounded-xl"
        />
        <h3 className="text-xl font-semibold">Search</h3>
      </div>
      <div className="text-zinc-500">
        You will be notified if anyone from your list shows signs of depression
        and suicidal thoughts.
      </div>
    </div>
  );
};

export default HowItWorksCard;
