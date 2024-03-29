import Image from "next/image";

const SplashScreen = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <div>
        <Image src="/logo.svg" alt="InstaNext" height={120} width={120} />
        <div className="mt-2 text-center text-2xl font-medium text-indigo-600">
          Caringly
        </div>
      </div>
      <div className="absolute bottom-4 text-center">
        <p className="text-sm font-semibold text-gray-600">by</p>
        <p className="bg-gradient-to-br from-indigo-200 via-indigo-400 via-20% to-indigo-600 to-70% bg-clip-text text-lg font-semibold text-transparent">
          Shen Yien
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
