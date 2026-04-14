import { Fragment } from "react";
import { eventItemStyles as s } from "./EventItem.styles";
import type { EventItemProps } from "./EventItem.types";

export default function EventItem({
  event,
  isPreRegistered,
  isSelected,
  canInteract,
  partnerName,
  onToggle,
  isLastItem = false,
}: EventItemProps) {
  let subtitleDisplay = "";
  if (isPreRegistered) {
    subtitleDisplay = "Registered for this event";
    if (event.type === "DOUBLES" && event.registration.partner) {
      subtitleDisplay += ` with partner: ${event.registration.partner.name}`;
    }
  } else if (isSelected) {
    if (event.type === "DOUBLES" && partnerName) {
      subtitleDisplay = `Event added to cart with partner: ${partnerName}`;
    } else {
      subtitleDisplay = `Event added to cart`;
    }
  }

  return (
    <Fragment key={event.eventId}>
      <div
        className={`${s.eventItem} ${(isSelected || isPreRegistered) ? 'border border-black/10' : ''} ${(isSelected || isPreRegistered) ? 'bg-gradient-to-r from-black/5 to-white' : 'bg-transparent'}`}
      >
        <div className={s.eventInfo}>
          <h3 className={s.eventName}>{event.name}</h3>
          <p className={`${s.eventSubtitle} ${subtitleDisplay ? 'opacity-100' : 'opacity-0'}`}>
            {subtitleDisplay || '\u00A0'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onToggle(event, isPreRegistered)}
          disabled={!canInteract}
          className={`
            ${s.toggleWrapper} 
            ${isSelected ? s.toggleEnabled : s.toggleDisabled} 
            ${!canInteract && !isPreRegistered ? "opacity-30 cursor-not-allowed" : ""} 
            ${isPreRegistered ? "opacity-60 cursor-not-allowed" : ""}
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
      {!isLastItem && (
        <div className="h-px bg-black/5 w-[calc(100%-2rem)] mx-auto" />
      )}
    </Fragment>
  );
}
