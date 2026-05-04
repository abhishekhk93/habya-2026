import { Fragment, useState, useEffect, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import { getConfigValue } from "@/lib/getConfigValue";
import { eventItemStyles as s } from "./EventItem.styles";
import type { EventItemProps } from "./EventItem.types";

export default function EventItem({
  event,
  isPreRegistered,
  isSelected,
  canInteract,
  partnerName,
  onToggle,
}: EventItemProps) {
  const configData = useAppSelector((state) => state.config.data);
  const singlesPrice = getConfigValue(configData, "price_event_singles", "0");
  const doublesPrice = getConfigValue(configData, "price_event_doubles", "0");
  const price = event.type === "SINGLES" ? singlesPrice : doublesPrice;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPopoverOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isPopoverOpen]);

  let subtitleDisplay: React.ReactNode = "";
  if (isPreRegistered) {
    subtitleDisplay = (
      <div className="flex items-center justify-between w-full">
        <span>
          Registered for this event
          {event.type === "DOUBLES" && event.registration.partner && (
            <> with partner: <strong>{event.registration.partner.name}</strong></>
          )}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-green-600 inline-block align-text-bottom ml-1.5 shrink-0">
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>
      </div>
    );
  } else if (isSelected) {
    subtitleDisplay = (
      <div className="flex items-center justify-between w-full">
        <span>
          {event.type === "DOUBLES" && partnerName ? (
            <>Event added to cart with partner: <strong>{partnerName}</strong></>
          ) : (
            <>Event added to cart</>
          )}
        </span>
      </div>
    );
  } else {
    subtitleDisplay = (
      <div className="flex items-center justify-between w-full">
        <strong>Amount: ₹ {price}</strong>
        {event.categoryDescription && (
          <div className="relative inline-block" ref={popoverRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPopoverOpen(!isPopoverOpen);
              }}
              className="text-[10px] uppercase tracking-widest font-bold text-indigo-500/70 hover:text-indigo-600 transition-colors py-0.5 px-1.5 rounded-md border border-indigo-200/50 bg-indigo-50/50"
            >
              know more
            </button>
            {isPopoverOpen && (
              <div className="absolute z-[100] bottom-full right-0 mb-3 w-56 p-4 bg-white border border-indigo-100 shadow-[0_8px_30px_rgba(79,70,229,0.1)] rounded-2xl text-[13px] leading-relaxed font-normal text-black/70 animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-sm">
                {event.categoryDescription}
                <div className="absolute top-full right-4 border-[6px] border-transparent border-t-white" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <Fragment key={event.categoryId}>
      <div
        className={`${s.eventItem} bg-white`}
      >
        {/* Top Section: Name and Toggle */}
        <div className={s.eventHeaderRow}>
          <h3 className={s.eventName}>{event.name}</h3>
          <button
            type="button"
            onClick={() => onToggle(event, isPreRegistered)}
            disabled={!canInteract}
            className={`
              ${s.toggleWrapper} 
              ${isPreRegistered ? s.toggleLocked : (isSelected ? s.toggleEnabled : s.toggleDisabled)} 
              ${!canInteract && !isPreRegistered ? "opacity-30 cursor-not-allowed" : ""} 
              ${isPreRegistered ? "cursor-not-allowed" : ""}
            `}
          >
            <span
              className={`
                ${s.toggleThumb} 
                ${(isSelected || isPreRegistered) ? s.toggleThumbActive : s.toggleThumbInactive}
                flex items-center justify-center
              `}
            >
              {isPreRegistered && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              )}
            </span>
          </button>
        </div>

        {/* Bottom Section: Full-width Subtitle with Divider */}
        <div className={`
          ${s.eventSubtitle} 
          ${subtitleDisplay ? "flex" : "hidden"}
          ${(isSelected || isPreRegistered) ? s.eventSubtitleActive : ""}
        `}>
          {subtitleDisplay}
        </div>
      </div>
    </Fragment>
  );
}
