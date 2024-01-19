import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { useRouteLoaderData } from "react-router-dom";
import { AppContextProvider } from "../components/AppContext";

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  const token = useRouteLoaderData("root");
  return (
    <AppContextProvider>
      {children}
      {token && <Navbar />}
      <Outlet />
      <Toaster />
    </AppContextProvider>
  );
}
