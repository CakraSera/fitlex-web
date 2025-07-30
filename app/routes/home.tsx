import { Button } from "~/components/ui/button";

// import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1>Cakrasera</h1>
      <Button>Click me</Button>
    </div>
  );
}
