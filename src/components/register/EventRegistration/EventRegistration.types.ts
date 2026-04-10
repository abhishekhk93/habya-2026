export interface Partner {
  name: string;
}

export interface EventRegistrationDetails {
  isRegistered: boolean;
  partner: Partner | null;
}

export interface EventType {
  eventId: number;
  /** Same as eligible categoryId (e.g. "003"); use for cart/API, not String(eventId). */
  categoryCode: string;
  name: string;
  type: "SINGLES" | "DOUBLES";
  categoryDescription?: string;
  isEnabled?: boolean;
  registration: EventRegistrationDetails;
}

export interface RegisterResponse {
  userId: number;
  eligibleEvents: EventType[];
}

export interface PartnerIdModalProps {
  eventName: string;
  eventId: number;
  categoryCode: string;
  onClose: () => void;
  onConfirm: (partner: { partnerId: string; partnerName: string }) => void;
}
