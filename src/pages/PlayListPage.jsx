import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import playSelectedSong from "../helpers/playSelectedSong";

export default function PlayListPage({ token }) {
  const songs = useLoaderData();
  const navigate = useNavigate();

  function handleOnClick(value) {
    playSelectedSong("play", "PUT", token, value.track.uri);
    navigate("/");
  }

  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {songs.map((value) => {
        {
          /* const labelId = `checkbox-list-secondary-label-${value}`; */
        }
        return (
          <ListItem key={value.track.id} onClick={() => handleOnClick(value)}>
            <ListItemButton>
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
