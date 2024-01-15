import { useLoaderData } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import playSelectedSong from "../helpers/playSelectedSong";
import { Button } from "@mui/material";
import deleteSongFromPayList from "../helpers/deleteSongFromPlayList";
import { useState } from "react";

export default function PlayListPage() {
  const songs = useLoaderData();
  const navigate = useNavigate();
  const { playlistId } = useParams();

  const [songsOnPlayList, setSongsOnPlayList] = useState(songs);

  function handleOnClick(value) {
    playSelectedSong("play", "PUT", value.track.uri);
    navigate("/");
  }

  function handleDelete(value) {
    const updatedSongs = songsOnPlayList.filter(
      (song) => song.track.uri !== value.track.uri
    );
    setSongsOnPlayList(updatedSongs);
    deleteSongFromPayList(playlistId, value.track.uri, "DELETE");
  }

  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {songsOnPlayList.map((value) => {
        return (
          <ListItem key={value.track.id}>
            <ListItemButton onClick={() => handleOnClick(value)}>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  alt="Album image"
                  src={value.track.album.images[0].url}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${value.track.name} ${value.track.album.artists[0].name} `}
              />
            </ListItemButton>
            <Button onClick={() => handleDelete(value)}>Delete</Button>
          </ListItem>
        );
      })}
    </List>
  );
}
