import type { EventType } from "../EventRegistration/EventRegistration.types";

export interface EventItemProps {
  event: EventType;
  isPreRegistered: boolean;
  isSelected: boolean;
  canInteract: boolean;
  partnerName?: string;
  onToggle: (event: EventType, isPreRegistered: boolean) => void;
  isLastItem?: boolean;
}
