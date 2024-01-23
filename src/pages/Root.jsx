import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "../components/AppContext";
import getSpotifyToken from "../helpers/getSpotifyToken";

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  //get token from local storage
  const token = getSpotifyToken();
  return (
    <AppContextProvider>
      {children}
      {token && <Navbar />}
      <Outlet />
      <Toaster />
    </AppContextProvider>
  );
}
