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
import getSpotifyToken from "./helpers/getSpotifyToken";
import SpotifyWebApi from "spotify-web-api-js";
import rootLoader from "./helpers/loaders/rootLoader";
const spotifyApi = new SpotifyWebApi();

export default function App() {
  //get spotify token from local storage
  const spotifyToken = getSpotifyToken();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      loader: rootLoader,
      id: "root",
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

  return <RouterProvider router={router} />;
}
