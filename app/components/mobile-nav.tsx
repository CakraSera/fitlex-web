import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Menu, Home, Package, User, LogOut } from "lucide-react";
import { user } from "~/lib/data";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
  ];

  const handleLogout = () => {
    console.log("User logged out");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-8 w-8 sm:h-10 sm:w-10">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  PW
                </span>
              </div>
              <span className="font-bold text-xl">PortableWorkout</span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col space-y-4 mt-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center space-x-3 text-lg font-medium hover:text-primary transition-colors py-2">
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Support
            </h3>
            <div className="space-y-3">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block text-sm hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link
                to="/shipping"
                onClick={() => setOpen(false)}
                className="block text-sm hover:text-primary transition-colors">
                Shipping Info
              </Link>
              <Link
                to="/faq"
                onClick={() => setOpen(false)}
                className="block text-sm hover:text-primary transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Account
            </h3>
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 py-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 p-0 h-auto">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="text-sm">Log out</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block text-sm hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block text-sm hover:text-primary transition-colors">
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
