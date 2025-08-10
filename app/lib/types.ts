import z from "zod";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  specifications: string[];
  benefits: string[];
  imageUrls: string[];
  videos: string[];
  category: string;
  sku: string;
  stockQuantity: number;
  featuredProduct: boolean;
  relatedPrograms: string[];
  primaryIndexUrl: number;
}

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.number(),
  featuredProduct: z.boolean(),
  imageUrl: z.string().nullable().optional(),
  stockQuantity: z.number().optional(),
  description: z.string().nullable().optional(),
});
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
