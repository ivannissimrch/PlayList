import { useLoaderData } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import deleteSongFromPayList from "../helpers/deleteSongFromPlayList";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../components/AppContext";

export default function PlayListPage() {
  const songs = useLoaderData();
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const { playSelectedSong } = useContext(AppContext);

  const [songsOnPlayList, setSongsOnPlayList] = useState(songs);

  function handleOnClick(selectedSong) {
    playSelectedSong([selectedSong.track.uri]);
    navigate("/");
  }

  function handleDelete(selectedSong) {
    const updatedSongs = songsOnPlayList.filter(
      (song) => song.track.uri !== selectedSong.track.uri
    );
    setSongsOnPlayList(updatedSongs);
    deleteSongFromPayList(playlistId, selectedSong.track.uri, "DELETE");
  }

  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {songsOnPlayList.map((song) => {
        return (
          <ListItem key={song.track.id}>
            <ListItemButton onClick={() => handleOnClick(song)}>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  alt="Album image"
                  src={song.track.album.images[0].url}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${song.track.name} ${song.track.album.artists[0].name} `}
              />
            </ListItemButton>
            <Button onClick={() => handleDelete(song)}>Delete</Button>
          </ListItem>
        );
      })}
    </List>
  );
}
