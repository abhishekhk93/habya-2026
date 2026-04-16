import type { SponsorshipLevel } from "../SponsorshipPage/SponsorshipPage.types";

export interface SponsorshipItemProps {
  level: SponsorshipLevel;
  isSelected: boolean;
  selectedGlobalId: string | null;
  onToggle: (levelId: string) => void;
  customAmount?: number;
  onCustomAmountChange?: (amount: number) => void;
}
