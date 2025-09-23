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

const ErrorRegisterSchema = registerSchema
  .pick({
    fullName: true,
    email: true,
    username: true,
    password: true,
    confirmPassword: true,
  })
  .extend({
    general: z.string().optional(),
  });

export type ErrorRegister = z.infer<typeof ErrorRegisterSchema>;
export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});
