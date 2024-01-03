import PropTypes from "prop-types";
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

export default function PlayListPage({ token }) {
  const songs = useLoaderData();
  const navigate = useNavigate();
  const { playlistId } = useParams();

  function handleOnClick(value) {
    playSelectedSong("play", "PUT", token, value.track.uri);
    navigate("/");
  }

  function handleDelete(value) {
    deleteSongFromPayList(playlistId, value.track.uri, "DELETE", token);
    navigate("/");
  }

  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {songs.map((value) => {
        return (
          <ListItem key={value.track.id}>
            <ListItemButton onClick={() => handleOnClick(value)}>
              <ListItemAvatar>
                <Avatar
                  alt="Album image"
                  src={value.track.album.images[0].url}
                />
              </ListItemAvatar>
              <ListItemText
                // id={labelId}
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
//propTypes
PlayListPage.propTypes = {
  token: PropTypes.string.isRequired,
};
