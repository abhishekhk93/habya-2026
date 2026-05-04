import type { EventType, RegisterResponse } from "../EventRegistration/EventRegistration.types";

export interface EventListProps {
  data: RegisterResponse;
  selectedEventIds: Set<string>;
  doublesPartners: Record<string, { id: string; name: string }>;
  onToggle: (event: EventType, isPreRegistered: boolean) => void;
}
