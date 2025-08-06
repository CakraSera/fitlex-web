import { Button } from "~/components/ui/button";

import type { Route } from "./+types/home";

export function meta() {
  return [
    {
      title: "Fitlex  - Transform Your Space Into a Personal Gym",
    },
    {
      name: "description",
      content:
        "Discover portable workout equipment designed for small spaces. Get fit anywhere, anytime with our premium collection.",
    },
  ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products`
  );
  const products = await response.json();
  console.log("Products loaded:", products);
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  // const { products } = loaderData;
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1>Cakrasera</h1>
      <Button>Click me</Button>
    </div>
  );
}
