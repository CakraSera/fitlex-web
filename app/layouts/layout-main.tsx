import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import type { Route } from "../layouts/+types/layout-main";
import { getSession } from "~/sessions.server";
import { clientOpenApi } from "~/lib/client-openapi";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const { data, error, response } = await clientOpenApi.GET("/cart", {
    params: {
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const totalItems: number = Number(data?.items.length);
  return { userAccess: session.has("token"), totalItems };
}

export default function UserLayout({
  loaderData,
}: {
  loaderData: { userAccess: boolean; totalItems: number };
}) {
  const { userAccess, totalItems } = loaderData;

  return (
    <>
      <Header userAccess={userAccess} totalItems={totalItems} />
      <main>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </>
  );
}
