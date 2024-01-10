import { useLoaderData } from "react-router-dom";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import addSongToPlayList from "../helpers/addSongTOPlayList";
import HeadPhonesImage from "../assets/images/headphones.jpg";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import createPlayList from "../helpers/createPlayList";
import { useState } from "react";

export default function AddToPlayList() {
  const lists = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const songToAdd = location.state.songToAdd;
  const token = location.state.token;

  async function handleOnClick(id) {
    await addSongToPlayList(id, songToAdd, "POST", token);
    navigate(`/library/${id}`);
  }

  const [playListName, setPlayListName] = useState("");
  function handleOnChange(event) {
    setPlayListName(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const playListId = await createPlayList(token, playListName);
    await addSongToPlayList(playListId, songToAdd, "POST", token);
    setPlayListName("");
    navigate(`/library/${playListId}`);
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
      {lists.map((list) => {
        return (
          <Card
            sx={{ width: 250, margin: "10px 10px" }}
            key={list.id}
            onClick={() => handleOnClick(list.id)}
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
