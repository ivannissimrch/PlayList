import { Card, Button } from "@mui/material";
import SpotifyPlayer from "react-spotify-web-playback";
import getSpotifyToken from "../helpers/getSpotifyToken";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

export default function MusicPlayer() {
  const token = getSpotifyToken();
  const { songOnPlayer } = useContext(AppContext);
  const navigate = useNavigate();
  function handleOnClick() {
    navigate("addToPlayList");
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <SpotifyPlayer
        token={token}
        uris={[songOnPlayer]}
        play="true"
        layout="responsive"
        hideAttribution="true"
      />
      <Button onClick={handleOnClick}>Add to Playlist</Button>
    </Card>
  );
}
