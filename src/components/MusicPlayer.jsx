import { Card, Button } from "@mui/material";
import SpotifyPlayer from "react-spotify-web-playback";
import getSpotifyToken from "../helpers/getSpotifyToken";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

export default function MusicPlayer() {
  //maybe get this token from context provider?
  const token = getSpotifyToken();
  const { songToPlay } = useContext(AppContext);
  const navigate = useNavigate();
  function handleOnClick() {
    navigate("addToPlayList");
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <SpotifyPlayer token={token} uris={[songToPlay]} play="true" />
      <Button onClick={handleOnClick}>Add to Playlist</Button>
    </Card>
  );
}
