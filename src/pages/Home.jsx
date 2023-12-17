import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import getTokenFromUrl from "../helpers/getToken";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();
import Login from "../components/Login";
import MusicPlayer from "../components/MusicPlayer";

export default function HomePage() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = ";";

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      spotifyApi.getMe();
      setLoggedIn(true);
    }
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight={500}
    >
      {!loggedIn && <Login />}
      {spotifyToken && <MusicPlayer />}
    </Box>
  );
}
