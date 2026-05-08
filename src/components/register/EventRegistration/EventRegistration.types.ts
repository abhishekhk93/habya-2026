export interface Partner {
  name: string;
}

export interface EventRegistrationDetails {
  isRegistered: boolean;
  partner: Partner | null;
}

export interface EventType {
  categoryId: string;
  name: string;
  type: "SINGLES" | "DOUBLES" | "SPECIAL_DOUBLES";
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
  categoryId: string;
  onClose: () => void;
  onConfirm: (partner: { partnerId: string; partnerName: string }) => void;
}
