declare module "react-lottie" {
  interface LottieProps {
    options: {
      loop: boolean;
      path: string;
      autoplay?: boolean;
    };
    height: number | string;
    width: number | string;
    isPaused?: boolean;
  }

  export default function Lottie(props: LottieProps): JSX.Element;
}
