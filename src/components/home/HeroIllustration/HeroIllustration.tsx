"use client";
import { ScatteredDots } from "@/components/home/ScatteredDots";
import { heroIllustrationStyles as s } from "./HeroIllustration.styles";

interface HeroIllustrationProps {
  size?: "small" | "large";
}

export default function HeroIllustration({ size = "large" }: HeroIllustrationProps) {
  const isSmall = size === "small";

  return (
    <div className={isSmall ? s.wrapperSmall : s.wrapper}>
      <img
        src="/images/habya-10-logo.png"
        alt="Habya Logo"
        className={isSmall ? s.illustrationSmall : s.illustration}
      />

      {!isSmall && <ScatteredDots />}
    </div>
  );
}
