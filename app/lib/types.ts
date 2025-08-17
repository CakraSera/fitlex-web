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

export const userSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(15, "Password must be at least 15 characters"),
});

export type User = z.infer<typeof userSchema>;

export const registerSchema = userSchema
  .pick({
    fullName: true,
    email: true,
    password: true,
  })
  .extend({
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});
