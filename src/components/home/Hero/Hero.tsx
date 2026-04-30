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

export default function Hero({ headline, description, initialIsLoggedIn = false }: HeroProps) {
  const { isLoggedIn: reduxIsLoggedIn, isLoading } = useAppSelector((state) => state.auth);

  // Use redux status if loaded, otherwise fall back to initial server status to prevent flicker
  const isLoggedIn = isLoading ? initialIsLoggedIn : reduxIsLoggedIn;

  return (
    <section className={isLoggedIn ? s.wrapperLoggedIn : s.wrapper}>
      <div className={isLoggedIn ? s.containerLoggedIn : s.container}>
        {/* 1. Title Block or Small Logo at the top */}
        {isLoggedIn ? null : (
          <TitleBlock 
            title={headline} 
            subtitle={description || ""} 
          />
        )}

        {isLoggedIn ? (
          <>
            {/* Profile & Get Started combined card */}
            <div className={s.contentCard}>
              <div className={s.contentInner}>
                <h1 className={s.pageTitle}>Welcome!</h1>
                <div className={s.pageSubtitle}>Your hub for registrations, gear, and support.</div>
              </div>

              <div className={s.section}>
                <SectionLabel>YOUR PROFILE</SectionLabel>
                <ProfileCard />
              </div>

              <div className={s.section}>
                <SectionLabel>GET STARTED</SectionLabel>
                <ActionCards />
              </div>
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
