import z from "zod";

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.number(),
  featuredProduct: z.boolean(),
  imageUrls: z.array(z.string().nullable().optional()),
  stockQuantity: z.number().optional(),
  description: z.string().nullable().optional(),
});

export type Product = z.infer<typeof productSchema>;
