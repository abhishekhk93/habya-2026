import { SponsorshipItem } from "../SponsorshipItem/SponsorshipItem";
import type { SponsorshipListProps } from "./SponsorshipList.types";

export function SponsorshipList({
  levels,
  selectedLevelId,
  onToggle,
  customAmount,
  onCustomAmountChange,
}: SponsorshipListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      {levels.map((level) => (
        <SponsorshipItem
          key={level.id}
          level={level}
          isSelected={selectedLevelId === level.id}
          selectedGlobalId={selectedLevelId}
          onToggle={onToggle}
          customAmount={customAmount}
          onCustomAmountChange={onCustomAmountChange}
        />
      ))}
    </div>
  );
}
