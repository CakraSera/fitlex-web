import { useState } from "react";
import { Link, useActionData, redirect, data } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import {
  registerSchema,
  type ErrorRegister,
  type Register,
} from "~/modules/auth/schema";
import { clientOpenApi } from "~/lib/client-openapi";
import type { Route } from "./+types/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commitSession, getSession } from "~/sessions.server";
import z from "zod";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("token")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/");
  }

  return data(
    { error: session.get("error") },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

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
  console.log("🚀 ~ action ~ validation:", validation.error);

  if (!validation.success) {
    return { errors: z.flattenError(validation.error).fieldErrors }; // Return validation errors
  }

  try {
    const { data, error, response } = await clientOpenApi.POST(
      "/auth/register",
      {
        body: {
          fullName: registerData.fullName,
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
        },
      }
    );

    if (error) {
      console.error(error);
      session.flash("error", "Invalid username/password");
    }

    if (!data) {
      return {
        errors: {
          general:
            "This account is already registered. Please register with a different account.",
        },
      };
    }
    return redirect("/login");
  } catch (error) {
    return {
      errors: {
        general: "An unexpected error occurred. Please try again.",
      },
    };
  }
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const actionData = useActionData<typeof action>();
  const errors: ErrorRegister = actionData?.errors;

  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

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
          <Form {...form}>
            <form method="post" className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                    {errors?.fullName ? (
                      <p className="text-destructive text-sm">
                        {errors.fullName}
                      </p>
                    ) : null}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        placeholder="Enter your username"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                    {errors?.username ? (
                      <p className="text-destructive text-sm">
                        {errors.username}
                      </p>
                    ) : null}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                    {errors?.email ? (
                      <p className="text-destructive text-sm">{errors.email}</p>
                    ) : null}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          required
                          placeholder="Create a password"
                          type={showPassword ? "text" : "password"}
                          {...field}
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
                    </FormControl>
                    {/* <FormMessage /> */}
                    {errors?.password ? (
                      <p className="text-destructive text-sm">
                        {errors.password}
                      </p>
                    ) : null}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          required
                          placeholder="Confirm your password"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }>
                          {showConfirmPassword ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    {/* <FormMessage /> */}
                    {errors?.confirmPassword ? (
                      <p className="text-destructive text-sm">
                        {errors.confirmPassword}
                      </p>
                    ) : null}
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </form>
          </Form>

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
