import { useState, useEffect } from "react";
import { sponsorshipItemStyles as s } from "./SponsorshipItem.styles";
import type { SponsorshipItemProps } from "./SponsorshipItem.types";

export function SponsorshipItem({
  level,
  isSelected,
  selectedGlobalId,
  onToggle,
  customAmount,
  onCustomAmountChange,
}: SponsorshipItemProps) {
  const [showWarning, setShowWarning] = useState(false);
  const isCustom = level.amount === "custom";
  const isToggleDisabled = isCustom && (!customAmount || customAmount <= 0);

  // Clear warning whenever the global selection changes (e.g. user selects another tier)
  useEffect(() => {
    setShowWarning(false);
  }, [selectedGlobalId, customAmount]);

  const tierBorderColors: Record<string, string> = {
    "Platinum": "border-indigo-300 bg-indigo-50",
    "Gold": "border-[#EAB308] bg-yellow-50",
    "Silver": "border-gray-400 bg-gray-50",
    "Bronze": "border-[#B45309] bg-orange-50",
    "Associate": "border-[#4C0519] bg-rose-50",
  };

  const badgeColor = tierBorderColors[level.name] || "border-black/5 bg-black/[0.04]";

  const handleToggleClick = () => {
    if (isToggleDisabled) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    onToggle(level.id);
  };

  const handleCustomChange = (val: number) => {
    onCustomAmountChange?.(val);
    if (val > 0) {
      setShowWarning(false);
    }
  };

  return (
    <div
      className={`${s.item} ${isSelected ? "bg-black/[0.02]" : "bg-transparent"}`}
    >
      <div className={s.headerRow}>
        {!isCustom && (
          <span className={`${s.amountBadge} ${badgeColor}`}>₹ {level.amount.toLocaleString()}</span>
        )}
        <h3 className={s.name}>{level.name}</h3>
        <button
          type="button"
          onClick={handleToggleClick}
          className={`
            ${s.toggleWrapper} 
            ${isSelected ? s.toggleEnabled : s.toggleDisabled} 
            ${isToggleDisabled ? "opacity-40 cursor-not-allowed" : ""}
          `}
        >
          <span
            className={`
              ${s.toggleThumb} 
              ${isSelected ? s.toggleThumbActive : s.toggleThumbInactive}
            `}
          />
        </button>
      </div>

      {isCustom && (
        <div className={s.customInputContainer}>
          <label className={s.customInputLabel}>Enter Custom Amount (₹)</label>
          <input
            type="number"
            min="0"
            step="500"
            value={customAmount || ""}
            onChange={(e) => handleCustomChange(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            placeholder="Ex: 1001"
            className={s.customInput}
          />
          {(showWarning || (isSelected && (!customAmount || customAmount <= 0))) && (
            <div className={s.warningMessage}>
              Enter an amount to enable sponsorship
            </div>
          )}
        </div>
      )}
    </div>
  );
}
