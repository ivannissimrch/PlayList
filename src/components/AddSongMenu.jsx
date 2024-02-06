import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  InputBase,
  ListItemAvatar,
  Paper,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useState, useEffect, Fragment } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";

export default function AddSongMenu() {
  const { spotifyApi } = useContext(AppContext);
  const [playLists, setPlayLists] = useState([]);
  const [state, setState] = useState({
    bottom: false,
  });
  const [playListName, setPlayListName] = useState("");

  useEffect(() => {
    async function fetchPlayList() {
      const playListData = await spotifyApi.getUserPlaylists();
      setPlayLists(playListData.items);
    }
    fetchPlayList();
  }, [spotifyApi]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {playLists.map((list) => (
          <ListItem
            key={list.id}
            disablePadding
            onClick={() => handleListItemclick(list)}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`{list.name}`}
                  src={list.images[0] ? list.images[0].url : ""}
                  variant="square"
                />
              </ListItemAvatar>

              <ListItemText primary={list.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  async function handleListItemclick(selectedPlayList) {
    try {
      const song = await spotifyApi.getMyCurrentPlayingTrack();
      const songToAdd = song.item.uri;
      const { items } = await spotifyApi.getPlaylistTracks(selectedPlayList.id);
      const songsOnPlayList = items;

      if (songsOnPlayList.some((song) => song.track.uri === songToAdd)) {
        toast("Song is already on this list");
        return;
      }

      await spotifyApi.addTracksToPlaylist(selectedPlayList.id, [songToAdd]);
      toast("Song Added to Playlist");
    } catch (error) {
      if (error.status === 401) {
        toast("Token expired please login again");
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        throw error;
      }
    }
  }

  function handleOnChange(event) {
    setPlayListName(event.target.value);
  }
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const song = await spotifyApi.getMyCurrentPlayingTrack();
      const songToAdd = song.item.uri;

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
      const playListData = await spotifyApi.getUserPlaylists();
      setPlayLists(playListData.items);
      setState((prev) => ({ ...prev, bottom: false }));
    } catch (error) {
      if (error.status === 401) {
        toast("Token expired please login again");
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        throw error;
      }
    }
  }

  return (
    <Fragment>
      <Button onClick={toggleDrawer("bottom", true)}>
        <MoreVertIcon />
      </Button>

      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            padding: 2,
          }}
        >
          <Typography variant="h5">Add To PlayList</Typography>
          <Paper component="form" onSubmit={handleSubmit}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Create playlist and add song"
              inputProps={{ "aria-label": "Create new playlist" }}
              onChange={handleOnChange}
              value={playListName}
            />
          </Paper>
          <Typography variant="h6">Save in</Typography>
          <Box>{list("bottom")}</Box>
        </Box>
      </Drawer>
    </Fragment>
  );
}
