"use client";

import { useAppSelector } from "@/store/hooks";
import { heroStyles as s } from "./Hero.styles";
import type { HeroProps } from "./Hero.types";
import { HeroIllustration } from "@/components/home/HeroIllustration";
import { TitleBlock } from "@/components/home/TitleBlock";
import { SectionLabel } from "@/components/home/SectionLabel";
import { ActionCards } from "@/components/home/ActionCards";
import { ProfileCard } from "@/components/home/ProfileCard";
import { AuthActions } from "@/components/home/AuthActions";
import { ScatteredDots } from "@/components/home/ScatteredDots";

export default function Hero({ headline, description }: HeroProps) {
  const { isLoggedIn, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) return null;

  return (
    <section className={s.wrapper}>
      <div className={s.container}>
        {/* 1. Title Block at the top */}
        <TitleBlock 
          title={headline} 
          subtitle={description || ""} 
        />

        {isLoggedIn ? (
          <>
            {/* 2. Scattered Dots below Title */}
            <ScatteredDots />

            {/* 3. Your Profile section */}
            <div className={s.section}>
              <SectionLabel>YOUR PROFILE</SectionLabel>
              <ProfileCard />
            </div>

            {/* 4. Get Started section */}
            <div className={s.section}>
              <SectionLabel>GET STARTED</SectionLabel>
              <ActionCards />
            </div>
          </>
        ) : (
          /* Logged Out Content */
          <>
            <HeroIllustration />
            <div className="flex flex-col items-center flex-1 justify-center">
              <AuthActions isVisible={true} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
