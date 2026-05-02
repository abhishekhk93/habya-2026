import Image from "next/image";
import { heroBackgroundStyles as s } from "./HeroBackground.styles";

export function HeroBackground() {
  return (
    <div className={s.wrapper}>
      <Image
        src="/images/habya-logo-bg-1.jpg"
        alt=""
        fill
        priority
        quality={80}
        className={s.image}
        aria-hidden="true"
      />
    </div>
  );
}
