import z from "zod";

export interface CartItem {
  product: Product;
  quantity: number;
}
