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
      <div className={isSmall ? s.ringSmall : s.ring}>
        <img
          src="/illustration-1.png"
          alt="Badminton Player"
          className={isSmall ? s.illustrationSmall : s.illustration}
        />
      </div>
      
      {!isSmall && <ScatteredDots />}
    </div>
  );
}
