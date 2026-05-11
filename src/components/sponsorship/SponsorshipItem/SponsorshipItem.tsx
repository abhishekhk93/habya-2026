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
  const isToggleDisabled = isCustom && (!customAmount || customAmount < 50);

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
      <div className={s.main}>
        <div className={s.headerRow}>
          {!isCustom && (
            <span className={`${s.amountBadge} ${badgeColor}`}>₹ {(level.amount || 0).toLocaleString()}</span>
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
              max="99999"
              step="50"
              value={customAmount || ""}
              onChange={(e) => handleCustomChange(Number(e.target.value))}
              onKeyDown={(e) => {
                if (["+", "-", "e", ".", "E"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              placeholder="Ex: 1001"
              className={s.customInput}
            />
            {(showWarning || (isSelected && (!customAmount || customAmount < 50))) && (
              <div className={s.warningMessage}>
                {!customAmount || customAmount === 0
                  ? "Enter an amount to enable sponsorship"
                  : "Minimum contribution is ₹50"}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={`
        ${s.subtitle} 
        ${isSelected ? s.subtitleActive : s.subtitleInactive}
      `}>
        <span className="flex items-center text-[13px] font-medium text-emerald-600">
          Sponsorship added to cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[14px] h-[14px] ml-1.5 shrink-0"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>
      </div>
    </div>
  );
}
