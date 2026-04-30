import Image from "next/image";
import { ScatteredDots } from "@/components/home/ScatteredDots";
import { heroIllustrationStyles as s } from "./HeroIllustration.styles";

interface HeroIllustrationProps {
  size?: "small" | "large";
}

export default function HeroIllustration({ size = "large" }: HeroIllustrationProps) {
  const isSmall = size === "small";

  return (
    <div className={isSmall ? s.wrapperSmall : s.wrapper}>
      <Image
        src="/images/habya-home-10-logo-1.png"
        alt="Habya Logo"
        width={650}
        height={650}
        priority
        quality={90}
        className={isSmall ? s.illustrationSmall : s.illustration}
      />

      {!isSmall && <ScatteredDots />}
    </div>
  );
}
