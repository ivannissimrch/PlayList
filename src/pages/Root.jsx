import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { useRouteLoaderData } from "react-router-dom";

export default function RootLayout() {
  const token = useRouteLoaderData("root");
  return (
    <>
      {token && <Navbar />}
      <Outlet />
      <Toaster />
    </>
  );
}
