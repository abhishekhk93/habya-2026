"use client";

import Image from "next/image";
import { heroBackgroundStyles as s } from "./HeroBackground.styles";

export function HeroBackground() {
  return (
    <div className={s.wrapper}>
      <img
        src="/images/home-background.png"
        alt=""
        className={s.image}
        aria-hidden="true"
      />
    </div>
  );
}
