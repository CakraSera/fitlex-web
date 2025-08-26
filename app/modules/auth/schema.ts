import { z } from "zod";
import { userSchema } from "../user/schema";

export const registerSchema = userSchema
  .pick({
    fullName: true,
    email: true,
    password: true,
    username: true,
  })
  .extend({
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type Register = z.infer<typeof registerSchema>;
export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});
