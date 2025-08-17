"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ShoppingCart, Package, User, TrendingUp } from "lucide-react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { Link } from "react-router";
import { dummyCartItems } from "~/lib/data";
import { type CartItem, type User as UserType } from "~/lib/types";

// import { ProtectedRoute } from "@/components/protected-route";

export default function DashboardPage() {
  const [user] = useSessionStorage<UserType | null>("user", null);
  const items: CartItem[] = dummyCartItems;

  const stats = [
    {
      title: "Cart Items",
      value: items.reduce((sum, item) => sum + item.quantity, 0),
      icon: ShoppingCart,
      href: "/cart",
    },
    {
      title: "Total Orders",
      value: "3",
      icon: Package,
      href: "/account",
    },
    {
      title: "Profile",
      value: "Complete",
      icon: User,
      href: "/account",
    },
  ];

  const quickActions = [
    {
      title: "Browse Products",
      href: "/products",
      description: "Explore our workout equipment",
    },
    {
      title: "View Cart",
      href: "/cart",
      description: "Review your selected items",
    },
    {
      title: "My Account",
      href: "/account",
      description: "Manage your profile and orders",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.fullName || "User"}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your workout equipment dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} to={stat.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <Link key={action.title} to={action.href}>
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
