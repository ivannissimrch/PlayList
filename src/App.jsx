import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import LibraryPage from "./pages/Library";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";

import { useEffect, useState } from "react";
import getTokenFromUrl from "./helpers/getToken";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();
import Login from "./components/Login";

export default function App() {
  const [spotifyToken, setSpotifyToken] = useState("");

  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = ";";
    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      spotifyApi.getMe();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: !spotifyToken ? (
            <Login />
          ) : (
            <HomePage token={spotifyToken} />
          ),
        },
        { path: "search", element: <SearchPage token={spotifyToken} /> },
        {
          path: "library",
          element: <LibraryPage token={spotifyToken} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
