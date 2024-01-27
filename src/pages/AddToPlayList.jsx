import { useLoaderData } from "react-router-dom";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HeadPhonesImage from "../assets/images/headphones.jpg";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../App";

export default function AddToPlayList() {
  const playLists = useLoaderData();
  const navigate = useNavigate();
  const { getSongToAdd, spotifyApi } = useContext(AppContext);
  const songToAdd = getSongToAdd();

  async function handleOnClick(selectedPlayList) {
    //get songs of selected playlist, check  if  song is on list if song is on list don't add
    const { items } = await spotifyApi.getPlaylistTracks(selectedPlayList.id);
    const songsOnPlayList = items;

    if (songsOnPlayList.some((song) => song.track.uri === songToAdd)) {
      toast("Song is already on this list");
      return;
    }

    await spotifyApi.addTracksToPlaylist(selectedPlayList.id, [songToAdd]);
    navigate(`/library/${selectedPlayList.id}`);
  }

  const [playListName, setPlayListName] = useState("");
  function handleOnChange(event) {
    setPlayListName(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      playLists.some(
        (list) => list.name.toUpperCase() === playListName.toUpperCase()
      )
    ) {
      toast("Cannot use this name");
      return;
    }

    const userId = await spotifyApi.getMe();
    const playList = await spotifyApi.createPlaylist(`${userId.id}`, {
      name: playListName,
    });

    setPlayListName("");
    await spotifyApi.addTracksToPlaylist(playList.id, [songToAdd]);
    navigate(`/library/${playList.id}`);
  }

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        direction: "row",
        flexWrap: "wrap",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          margin: "8px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Create new playlist and add song"
          inputProps={{ "aria-label": "Create new playlist" }}
          onChange={handleOnChange}
          value={playListName}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        ></IconButton>
      </Paper>
      {playLists.map((list) => {
        return (
          <Card
            sx={{ width: 250, margin: "10px 10px" }}
            key={list.id}
            onClick={() => handleOnClick(list)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                width="250"
                image={
                  list.images.length === 0
                    ? HeadPhonesImage
                    : list.images[0].url
                }
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {list.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to Add To PlayList
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Container>
  );
}
