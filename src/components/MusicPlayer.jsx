import { Card } from "@mui/material";
import SpotifyPlayer from "react-spotify-web-playback";
import getSpotifyToken from "../helpers/getSpotifyToken";
import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function MusicPlayer() {
  //maybe get this token from context provider?
  const token = getSpotifyToken();
  const { songToPlay } = useContext(AppContext);
  return (
    <Card sx={{ display: "flex" }}>
      <SpotifyPlayer token={token} uris={songToPlay} play="true" />
    </Card>
  );
}
