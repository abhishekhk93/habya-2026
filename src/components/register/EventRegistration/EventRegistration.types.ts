export interface Partner {
  userId: number;
  name: string;
}

export interface EventRegistrationDetails {
  isRegistered: boolean;
  partner: Partner | null;
}

export interface EventType {
  eventId: number;
  name: string;
  type: "SINGLES" | "DOUBLES";
  registration: EventRegistrationDetails;
}

export interface RegisterResponse {
  userId: number;
  eligibleEvents: EventType[];
}

export interface PartnerIdModalProps {
  eventName: string;
  eventId: number;
  onClose: () => void;
  onConfirm: (partnerId: string) => void;
}
