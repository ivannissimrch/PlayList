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
import SpotifyWebApi from "spotify-web-api-js";
import { createContext, useEffect, useState } from "react";
import getTokenFromUrl from "./helpers/getTokenFromUrl";
import localStorageToken from "./helpers/localStorageToken";

const spotifyApi = new SpotifyWebApi();

export const AppContext = createContext();

export default function App() {
  const [spotifyToken, setSpotifyToken] = useState(localStorageToken());
  let songToAdd = "";
  spotifyApi.setAccessToken(localStorageToken());

  const [songOnPlayer, setSongOnPlayer] = useState([
    "spotify:track:3d2J1W0Msqt6z0TkF0ywLk",
    "spotify:track:3Xfg7AegXaDLoD5GOUMf2e",
    "spotify:track:0puoT9566xTWBoRw8qDKxk",
  ]);

  useEffect(() => {
    //get the token from the spofity Api server
    const tokenFromApi = getTokenFromUrl().access_token;
    window.location.hash = ";";
    if (tokenFromApi) {
      //this only runs the first time the app loads
      //store spotify token on local storage
      localStorage.setItem("token", tokenFromApi);
      setSpotifyToken(tokenFromApi);
    }
  }, []);

  async function playSelectedSong(selectedSong) {
    setSongOnPlayer(selectedSong);
  }

  function updateSongToAdd(lastPlayingSong) {
    songToAdd = lastPlayingSong;
  }

  function getSongToAdd() {
    return songToAdd;
  }

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
      ],
    },
  ]);

  return (
    <AppContext.Provider
      value={{
        songOnPlayer,
        playSelectedSong,
        spotifyApi,
        updateSongToAdd,
        getSongToAdd,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
