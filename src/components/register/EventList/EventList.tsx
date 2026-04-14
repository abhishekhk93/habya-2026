import { EventItem } from "../EventItem";
import { eventListStyles as s } from "./EventList.styles";
import type { EventListProps } from "./EventList.types";

export default function EventList({
  data,
  selectedEventIds,
  doublesPartners,
  onToggle,
}: EventListProps) {
  return (
    <div className={s.listContainer}>
      {data.eligibleEvents.map((event, index) => {
        const isPreRegistered = event.registration.isRegistered;
        const isSelected = selectedEventIds.has(event.eventId);
        const canInteract = !isPreRegistered && (isSelected || selectedEventIds.size < 2);
        const partnerName = doublesPartners[event.eventId]?.name;
        const isLastItem = index === data.eligibleEvents.length - 1;

        return (
          <EventItem
            key={event.eventId}
            event={event}
            isPreRegistered={isPreRegistered}
            isSelected={isSelected}
            canInteract={canInteract}
            partnerName={partnerName}
            onToggle={onToggle}
            isLastItem={isLastItem}
          />
        );
      })}
    </div>
  );
}
