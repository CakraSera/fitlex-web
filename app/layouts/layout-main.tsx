import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import type { Route } from "../layouts/+types/layout-main";
import { getSession } from "~/sessions.server";


export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return { userAccess: session.has("token") };
}

export default function UserLayout({
  loaderData,
}: {
  loaderData: { userAccess: boolean };
}) {
  const userAccess = loaderData.userAccess;

  return (
    <>
      <Header userAccess={userAccess} />
      <main>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </>
  );
}
