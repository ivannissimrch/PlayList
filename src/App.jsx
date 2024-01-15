import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import LibraryPage from "./pages/Library";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import getPlayList from "./helpers/getPlayList";
import PlayListPage from "./pages/PlayListPage";
import { useEffect, useState } from "react";
import getTokenFromUrl from "./helpers/getToken";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();
import Login from "./components/Login";
import getPlayListSongs from "./helpers/getPlayListSongs";
import AddToPlayList from "./pages/AddToPlayList";
import getSpotifyToken from "./helpers/getSpotifyToken";

export default function App() {
  const [spotifyToken, setSpotifyToken] = useState(getSpotifyToken());
  //get token
  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = ";";
    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      //store spotify token on local storage
      localStorage.setItem("token", spotifyToken);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      loader: getSpotifyToken,
      id: "root",
      children: [
        {
          path: "",
          element: !spotifyToken ? <Login /> : <HomePage />,
        },
        { path: "search", element: <SearchPage /> },
        {
          path: "library",
          loader: () => getPlayList(),
          element: <LibraryPage />,
        },
        {
          path: "/library/:playlistId",
          loader: ({ params }) => getPlayListSongs(params),
          element: <PlayListPage />,
        },
        {
          path: "addToPlayList",
          loader: () => getPlayList(),
          element: <AddToPlayList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
