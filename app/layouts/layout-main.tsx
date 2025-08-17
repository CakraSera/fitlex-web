import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";

export default function UserLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </>
  );
}
