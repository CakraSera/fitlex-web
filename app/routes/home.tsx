import { Button } from "~/components/ui/button";

import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/products`
  );
  console.log("🚀 ~ clientLoader ~ response:", response);
  const products = await response.json();
  return { products };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;
  console.log("🚀 ~ Home ~ products:", products);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1>Cakrasera</h1>
      <Button>Click me</Button>
    </div>
  );
}
