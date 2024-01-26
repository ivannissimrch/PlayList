import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import LibraryPage from "./pages/Library";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import getPlayList from "./helpers/loaders/getPlayList";
import PlayListPage from "./pages/PlayListPage";
import Login from "./components/Login";
import getPlayListSongs from "./helpers/loaders/getPlayListSongs";
import AddToPlayList from "./pages/AddToPlayList";
import SpotifyWebApi from "spotify-web-api-js";
import { createContext, useEffect, useState } from "react";
import getTokenFromUrl from "./helpers/getTokenFromUrl";
import getSpotifyToken from "./helpers/getSpotifyToken";
//instance of the spotifyApi
const spotifyApi = new SpotifyWebApi();

export const AppContext = createContext();

export default function App() {
  const [spotifyToken, setSpotifyToken] = useState(getSpotifyToken());
  const [songOnPlayer, setSongOnPlayer] = useState(
    "spotify:track:0puoT9566xTWBoRw8qDKxk"
  );

  function playSelectedSong(selectedSong) {
    setSongOnPlayer(selectedSong);
  }

  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = ";";
    if (spotifyToken) {
      //store spotify token on local storage
      localStorage.setItem("token", spotifyToken);
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken();
    } else {
      spotifyApi.setAccessToken(getSpotifyToken());
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
          element: !spotifyToken ? <Login /> : <HomePage />,
        },
        { path: "search", element: <SearchPage /> },
        {
          path: "library",
          loader: () => getPlayList(spotifyApi),
          element: <LibraryPage />,
        },
        {
          path: "/library/:playlistId",
          loader: ({ params }) => getPlayListSongs(params, spotifyApi),
          element: <PlayListPage />,
        },
        {
          path: "addToPlayList",
          loader: () => getPlayList(spotifyApi),
          element: <AddToPlayList />,
        },
      ],
    },
  ]);

  return (
    <AppContext.Provider value={{ songOnPlayer, playSelectedSong, spotifyApi }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
