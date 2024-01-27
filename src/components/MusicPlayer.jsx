import { Card, Button } from "@mui/material";
import SpotifyPlayer from "react-spotify-web-playback";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function MusicPlayer() {
  const { songOnPlayer, spotifyApi, updateSongToAdd } = useContext(AppContext);
  const token = spotifyApi.getAccessToken();
  const navigate = useNavigate();

  async function handleOnClick() {
    const songToAdd = await spotifyApi.getMyCurrentPlayingTrack();
    updateSongToAdd(songToAdd.item.uri);
    navigate("addToPlayList");
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <SpotifyPlayer
        token={token}
        uris={songOnPlayer}
        play="true"
        layout="responsive"
        hideAttribution="true"
      />
      <Button onClick={handleOnClick}>Add to Playlist</Button>
    </Card>
  );
}
