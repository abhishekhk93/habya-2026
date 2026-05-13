import Image from "next/image";
import { sponsorLogoStyles as s } from "./SponsorLogo.styles";
import type { SponsorLogoProps } from "./SponsorLogo.types";

export default function SponsorLogo({ className = "", variant = "hero" }: SponsorLogoProps) {
  return (
    <div className={`${variant === "hero" ? s.hero : s.navbar} ${className}`}>
      <Image
        src="/images/Agamana-logo.png"
        alt="Agamana Sponsor Logo"
        width={300}
        height={100}
        className="w-full h-auto object-contain"
        priority={variant === "hero"}
      />
    </div>
  );
}
