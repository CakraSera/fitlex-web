import { ShoppingCart, LogOut, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { MobileNav } from "~/components/mobile-nav";
import { Link, redirect } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { Route } from "../layouts/+types/layout-main";
import { dummyCartItems } from "~/lib/data";
// import { destroySession, getSession } from "~/sessions.server";

export async function action({ request }: Route.ActionArgs) {
  return null;
}

export function Header({ userAccess }: { userAccess: boolean }) {
  const totalItems = dummyCartItems.length;
  // const [user, setUser] = useSessionStorage<UserType | null>("user", null);
  // const user: UserType | null = null; // Replace with actual user state management

  async function logout() {
    // setUser(null);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4 w-full">
        <div className="flex items-center gap-2 sm:gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-6 w-6 sm:h-8 sm:w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs sm:text-sm">
                FL
              </span>
            </div>
            <span className="font-bold text-lg sm:text-xl hidden xs:block">
              Fitlex
            </span>
            <span className="font-bold text-lg sm:text-xl xs:hidden">
              Fitlex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>
            {/* <Link
              to="/bundles"
              className="text-sm font-medium hover:text-primary transition-colors">
              Bundles
            </Link> */}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Cart Button */}
          <Link to="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 sm:h-10 sm:w-10">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Shopping cart</span>
              {totalItems > 0 && userAccess && (
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems > 99 ? "99+" : totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          {userAccess ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden lg:flex h-8 w-8 sm:h-10 sm:w-10">
                  <User className="h-4 w-4" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {/* {user.fullName} */}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {/* {user.email} */}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <form method="post"> */}
                <DropdownMenuItem
                  asChild
                  className="text-red-600 focus:text-red-600">
                  {/* <button type="submit"> */}
                  <Link to="/logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                  {/* </button> */}
                </DropdownMenuItem>
                {/* </form> */}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
