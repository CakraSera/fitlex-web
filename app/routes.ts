import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout-main.tsx", [
    index("routes/home.tsx"),
    ...prefix("products", [
      route("/", "routes/products.tsx"),
      route("/:slug", "routes/products-slug.tsx"),
    ]),
    route("login", "routes/login.tsx"),
    route("logout", "routes/logout.tsx"),
    route("register", "routes/register.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("account", "routes/account.tsx"),
    route("cart", "routes/cart.tsx"),
  ]),
] satisfies RouteConfig;
