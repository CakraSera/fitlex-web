import z from "zod";

export const userSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(15, "Password must be at least 15 characters"),
});

export type User = z.infer<typeof userSchema>;
