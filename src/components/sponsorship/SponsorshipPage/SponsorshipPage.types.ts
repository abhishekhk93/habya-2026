export interface SponsorshipLevel {
  id: string;
  name: string;
  amount: number | "custom";
  description?: string;
}

export interface SponsorshipPageProps {}
