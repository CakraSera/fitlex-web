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
    route("cart", "routes/cart.tsx"),
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
  ]),
] satisfies RouteConfig;
