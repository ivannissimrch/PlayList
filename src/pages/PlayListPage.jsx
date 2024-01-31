import { useLoaderData } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useState, useContext } from "react";
import { AppContext } from "../App";

export default function PlayListPage() {
  const songs = useLoaderData();
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const { playSelectedSong, spotifyApi } = useContext(AppContext);
  const [songsOnPlayList, setSongsOnPlayList] = useState(songs);

  function handlePlayAll() {
    const listOfSongs = songs.map((song) => song.track.uri);
    playSelectedSong(listOfSongs);
    navigate("/");
  }

  function handlePlaySong(selectedSong) {
    playSelectedSong(selectedSong.track.uri);
    navigate("/");
  }

  function handleDelete(selectedSong) {
    const updatedSongs = songsOnPlayList.filter(
      (song) => song.track.uri !== selectedSong.track.uri
    );
    setSongsOnPlayList(updatedSongs);
    spotifyApi.removeTracksFromPlaylist(playlistId, [selectedSong.track.uri]);
  }

  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button onClick={handlePlayAll}>Play all</Button>
      {songsOnPlayList.map((song) => {
        return (
          <ListItem key={song.track.id}>
            <ListItemButton onClick={() => handlePlaySong(song)}>
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
