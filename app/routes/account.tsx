import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { User, Mail, Calendar, Package } from "lucide-react";
import { user } from "~/lib/data";

export default function AccountPage() {
  if (!user) return null;

  // Mock order data for demonstration
  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: "Rp 899,000",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-01-08",
      status: "Processing",
      total: "Rp 1,299,000",
      items: 2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground">
          Manage your account settings and view your order history
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your personal account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <p className="text-sm font-medium">{user.name}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Member Since
                </label>
                <p className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  18 October
                  {/* {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} */}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Account Status
                </label>
                <Badge variant="secondary" className="w-fit">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recent Orders
            </CardTitle>
            <CardDescription>
              Your latest purchases and order status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={order.id}>
                  <div className="flex items-center justify-between py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-sm">{order.id}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()} •{" "}
                        {order.items} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{order.total}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs">
                        View Details
                      </Button>
                    </div>
                  </div>
                  {index < recentOrders.length - 1 && <Separator />}
                </div>
              ))}
              <div className="pt-4">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Orders
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
