"use client";

import { ScatteredDots } from "@/components/home/ScatteredDots";
import { heroIllustrationStyles as s } from "./HeroIllustration.styles";

export default function HeroIllustration() {
  return (
    <div className={s.wrapper}>
      <div className={s.ring}>
        <img
          src="/illustration-1.png"
          alt="Badminton Player"
          className={s.illustration}
        />
      </div>
      
      <ScatteredDots />
    </div>
  );
}
