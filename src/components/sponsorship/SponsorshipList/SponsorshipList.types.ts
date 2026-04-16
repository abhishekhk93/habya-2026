import type { SponsorshipLevel } from "../SponsorshipPage/SponsorshipPage.types";

export interface SponsorshipListProps {
  levels: SponsorshipLevel[];
  selectedLevelId: string | null;
  onToggle: (levelId: string) => void;
  customAmount?: number;
  onCustomAmountChange?: (amount: number) => void;
}
