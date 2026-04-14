export type ShirtSize = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XS' | '2XS' | '3XS' | '4XS' | '5XS' | '6XS' | '7XS' | '8XS' | '9XS' | '10XS';
export type ShirtStyle = 'Roundneck Sleeveless' | 'Roundneck Half Sleeves' | 'Collared Half sleeves';

export interface ShirtDesign {
    id: string;
    name: string;
    frontImage: string;
    backImage: string;
    price: number;
}

export interface SizeChartItem {
  size: string;
  width: string;
  length: string;
  sleeve: string;
  shoulder: string;
};

export interface ShopProps {
    className?: string;
}
