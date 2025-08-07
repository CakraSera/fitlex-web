export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  specifications: string[];
  benefits: string[];
  images: string[];
  videos: string[];
  category: string;
  sku: string;
  inStock: boolean;
  isFeatured: boolean;
  relatedPrograms: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BundlePackage {
  id: string;
  name: string;
  description: string;
  products: string[];
  originalPrice: number;
  bundlePrice: number;
  image: string;
}
