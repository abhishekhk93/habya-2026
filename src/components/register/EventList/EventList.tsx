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
        const isSelected = selectedEventIds.has(event.categoryId);
        const canInteract = !isPreRegistered && (isSelected || selectedEventIds.size < 2);
        const partnerName = doublesPartners[event.categoryId]?.name;
        const isLastItem = index === data.eligibleEvents.length - 1;

        return (
          <EventItem
            key={event.categoryId}
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
