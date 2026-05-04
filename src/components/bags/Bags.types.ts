export interface Bag {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
}

export interface BagsProps {
  bags: Bag[];
}
