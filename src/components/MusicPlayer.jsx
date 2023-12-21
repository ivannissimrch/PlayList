import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();
import PropTypes from "prop-types";

function MusicPlayer({ token }) {
  const [nowPlaying, setNowPlaying] = useState({});

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      setNowPlaying({
        name: response.item.name,
        artist: response.item.artists[0].name,
        albumCover: response.item.album.images[0].url,
      });
    });
  };

  async function pause() {
    const response = await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Awaiting response.json()
    const resData = await response.json();
    return resData;
  }

  async function nextSong() {
    const response = await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Awaiting response.json()
    const resData = await response.json();
    return resData;
  }

  async function previousSong() {
    const response = await fetch(
      "https://api.spotify.com/v1/me/player/previous",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Awaiting response.json()
    const resData = await response.json();
    return resData;
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
          <IconButton aria-label="play/pause" onClick={pause}>
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next" onClick={nextSong}>
            <SkipNextIcon />
          </IconButton>
        </Box>
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

//propTypes
MusicPlayer.propTypes = {
  token: PropTypes.string.isRequired,
};

export default MusicPlayer;
