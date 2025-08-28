import { useState } from "react";
import { Link, useNavigate, useActionData, redirect } from "react-router";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { registerSchema, type Register } from "~/modules/auth/schema";
import { type User } from "~/modules/user/schema";
import { clientOpenApi } from "~/lib/client-openapi";
import type { Route } from "./+types/register";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const registerData = {
    fullName: formData.get("fullName") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  // Validate the data
  const validation = registerSchema.safeParse(registerData);
  console.log("🚀 ~ action ~ validation:", validation.error!.issues);
  if (!validation.success) {
    return { errors: validation.error!.issues };
  }

  return null;
  const { data, error } = await clientOpenApi.POST("/auth/register", {
    body: {
      fullName: registerData.fullName,
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
    },
  });

  if (!data) {
    return {
      errors: {
        general:
          "This account is already registered. Please register with a different account.",
      },
    };
  }
  redirect("/dashboard");
}

export default function RegisterPage({ actionData }: Route.ComponentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create account
          </CardTitle>
          <CardDescription className="text-center">
            Join PortableWorkout and start your fitness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="post" className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                required
                type="text"
                name="fullName"
                placeholder="Enter your full name"
              />
              {actionData?.errors?.fullName && (
                <p className="text-sm text-red-500">
                  {actionData.errors.fullName[0]}
                </p>
              )}
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                required
                type="text"
                name="username"
                placeholder="Enter your username"
              />
              {actionData?.errors?.username && (
                <p className="text-sm text-red-500">
                  {actionData.errors.username[0]}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                required
                type="email"
                name="email"
                placeholder="Enter your email"
              />
              {actionData?.errors?.email && (
                <p className="text-sm text-red-500">
                  {actionData.errors.email[0]}
                </p>
              )}
            </div>
            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  required
                  name="password"
                  placeholder="Create a password"
                  type={showPassword ? "text" : "password"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {actionData?.errors?.password && (
                <p className="text-sm text-red-500">
                  {actionData.errors.password[0]}
                </p>
              )}
            </div>
            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  required
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type={showConfirmPassword ? "text" : "password"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {actionData?.errors?.confirmPassword && (
                <p className="text-sm text-red-500">
                  {actionData.errors.confirmPassword[0]}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
