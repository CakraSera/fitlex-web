import { Outlet } from "react-router";
import { Header } from "~/components/header";

export default function UserLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2023 Fitlex</p>
      </footer>
    </>
  );
}
