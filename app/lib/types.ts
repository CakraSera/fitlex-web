import z from "zod";

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
