export type ShirtSize = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XS' | '2XS' | '3XS' | '4XS' | '5XS' | '6XS' | '7XS' | '8XS' | '9XS' | '10XS';
export type ShirtStyle = 'Roundneck Sleeveless' | 'Roundneck Half Sleeves' | 'Collared Half sleeves';

export interface ShirtDesign {
    id: string;
    name: string;
    type: 'ROUND_NECK_HALF' | 'ROUND_NECK_SLEEVELESS' | 'COLLARED_HALF';
    frontImage: string;
    backImage: string;
    price: number;
    configKey?: string;
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
