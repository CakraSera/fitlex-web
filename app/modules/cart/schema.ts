import { z } from "zod";
import { productSchema } from "../products/schema";

export const CartItemSchema = z.object({
  id: z.string(),

  quantity: z.number(),

  productId: z.string(),
  product: productSchema,

  cartId: z.string(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CartSchema = z.object({
  // The unique ID for the user, typically an auto-generated string.
  id: z.string(),
  items: z.array(CartItemSchema),
  // The timestamp when the user account was created.
  createdAt: z.date(),
  // The timestamp of the last time the user account was updated.
  updatedAt: z.date(),
});

export const AddCartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().default(1),
});

export type Cart = z.infer<typeof CartSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
