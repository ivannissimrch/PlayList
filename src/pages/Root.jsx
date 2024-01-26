import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import getSpotifyToken from "../helpers/getSpotifyToken";

export default function RootLayout() {
  const spotifyToken = getSpotifyToken();

  return (
    <>
      {spotifyToken && <Navbar />}
      <Outlet />
      <Toaster />
    </>
  );
}
