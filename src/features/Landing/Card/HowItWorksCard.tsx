import Image from "next/image";

interface HowItWorksCardProps {
  image: string;
  title: string;
  description: string;
}

const HowItWorksCard = ({ image, title, description }: HowItWorksCardProps) => {
  return (
    <div className="px-4">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={image}
          height="250"
          width="250"
          alt=""
          className="mb-2 h-[180px] w-[250px] rounded-xl border-2 border-solid border-gray-200 object-cover shadow-sm"
        />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="px-8 text-center text-zinc-500">{description}</div>
    </div>
  );
};

export default HowItWorksCard;
