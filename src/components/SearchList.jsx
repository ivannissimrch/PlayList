import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import playSelectedSong from "../helpers/playSelectedSong";

export default function SearchList({ searchResults }) {
  const navigate = useNavigate();

  function handleOnClick(value) {
    playSelectedSong("play", "PUT", value.uri);
    navigate("/");
  }

  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {searchResults.tracks.items.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value.id} onClick={() => handleOnClick(value)}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  alt="Album image"
                  src={value.album.images[0].url}
                />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={`${value.name} ${value.album.artists[0].name} `}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

SearchList.propTypes = {
  searchResults: PropTypes.object.isRequired,
};
