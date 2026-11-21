export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  description: string;
  images: string[];
  packageContents: string[];
  details: { label: string; value: string }[];
}
