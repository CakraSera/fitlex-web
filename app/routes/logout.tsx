import { data, Link, redirect } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { getSession, destroySession } from "../sessions.server";
import { clientOpenApi } from "~/lib/client-openapi";
import type { Route } from "./+types/logout";
import { useState } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) {
    return redirect("/");
  }
  const { data, error, response } = await clientOpenApi.GET("/auth/me", {
    params: {
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  });
  if (!response.ok) {
    console.error(error);
  }
  return { user: data };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}

export default function LogoutRoute({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <LogOut className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Confirm Logout</CardTitle>
          <CardDescription>
            Are you sure you want to logout from your account?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="post" className="space-y-4">
            <div className="text-center text-sm text-gray-600 mb-6">
              <p>
                You are currently logged in as <strong>{user?.username}</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button type="submit" variant="destructive" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Yes, Logout
              </Button>

              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent">
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
