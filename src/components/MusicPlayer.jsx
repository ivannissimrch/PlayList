import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();
import spotifyPlayerRequest from "../helpers/spotifyPlayerRequest";
import { useNavigate } from "react-router-dom";

export default function MusicPlayer() {
  const [nowPlaying, setNowPlaying] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      setIsPlaying(response.is_playing);
      setNowPlaying({
        name: response.item.name,
        artist: response.item.artists[0].name,
        albumCover: response.item.album.images[0].url,
        songUrl: response.item.uri,
      });
    });
  };

  function addSongToPlayList(songToAdd) {
    navigate("addToPlayList", {
      state: { songToAdd: songToAdd.songUrl },
    });
  }

  async function startPlayBack() {
    await spotifyPlayerRequest("play", "PUT");
  }

  async function pause() {
    await spotifyPlayerRequest("pause", "PUT");
  }

  async function nextSong() {
    await spotifyPlayerRequest("next", "POST");
  }

  async function previousSong() {
    await spotifyPlayerRequest("previous", "POST");
  }

  useEffect(getNowPlaying, [nowPlaying]);

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {nowPlaying.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {nowPlaying.artist}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous" onClick={previousSong}>
            <SkipPreviousIcon />
          </IconButton>
          {!isPlaying && (
            <IconButton aria-label="play" onClick={startPlayBack}>
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          )}
          {isPlaying && (
            <IconButton aria-label="pause" onClick={pause}>
              <PauseIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          )}
          <IconButton aria-label="next" onClick={nextSong}>
            <SkipNextIcon />
          </IconButton>
        </Box>

        <Button
          aria-label="previous"
          onClick={() => addSongToPlayList(nowPlaying)}
        >
          Add To Playlist
        </Button>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={nowPlaying.albumCover}
        alt="Live from space album"
      />
    </Card>
  );
}
