export type ProductCategory = 'camera' | 'sensor' | 'hub' | 'siren' | 'keypad';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  shortDescription: string;
  features: string[];
  images: string[];
  ar3DModel?: string;
  slug: string;
}

export interface Pack {
  id: string;
  name: string;
  slug: string;
  products: string[];
  price: number;
  discount: number;
  description: string;
  features: string[];
  image: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  type: 'product' | 'pack';
}
