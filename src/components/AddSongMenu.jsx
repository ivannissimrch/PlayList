import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Avatar,
  CircularProgress,
  InputBase,
  ListItemAvatar,
  Paper,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useState, useEffect, Fragment } from "react";
import { AppContext } from "../App";
import toast from "react-hot-toast";
import CancelIcon from "@mui/icons-material/Cancel";
import { handleExpiredToken } from "../helpers/handleExpiredToken";

export default function AddSongMenu() {
  const { spotifyApi } = useContext(AppContext);
  const [playLists, setPlayLists] = useState([]);
  const [state, setState] = useState({
    bottom: false,
  });
  const [playListName, setPlayListName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const showFetchingDataMessage = (
    <Fragment>
      <CircularProgress />
      <Typography variant="h6">Creating new playlist</Typography>
    </Fragment>
  );

  useEffect(() => {
    async function fetchPlayList() {
      try {
        const playListData = await spotifyApi.getUserPlaylists();
        setPlayLists(playListData.items);
      } catch (error) {
        handleExpiredToken(error);
      }
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
        {playLists.map((list) => {
          return (
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
          );
        })}
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
      handleExpiredToken(error);
    }
  }

  function handleNewPlaylistInputChange(event) {
    setPlayListName(event.target.value);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setIsLoading(true);
      const song = await spotifyApi.getMyCurrentPlayingTrack();
      const songToAdd = song.item.uri;

      if (
        playLists.some(
          (list) => list.name.toUpperCase() === playListName.toUpperCase()
        )
      ) {
        toast("Cannot use this name");
        setIsLoading(false);
        setPlayListName("");
        setState((prev) => ({ ...prev, bottom: false }));
        return;
      }

      const userId = await spotifyApi.getMe();
      const playList = await spotifyApi.createPlaylist(`${userId.id}`, {
        name: playListName,
      });

      await spotifyApi.addTracksToPlaylist(playList.id, [songToAdd]);
      const playListData = await spotifyApi.getUserPlaylists();
      setPlayLists(playListData.items);
      setPlayListName("");
      setIsLoading(false);
      toast("Song Added to Playlist");
      setState((prev) => ({ ...prev, bottom: false }));
    } catch (error) {
      handleExpiredToken(error);
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
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">Add To PlayList</Typography>

            <Button onClick={toggleDrawer("bottom", false)}>
              <CancelIcon />
            </Button>
          </Box>
          <Paper component="form" onSubmit={handleSubmit}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Create playlist and add song"
              inputProps={{ "aria-label": "Create new playlist" }}
              onChange={handleNewPlaylistInputChange}
              value={playListName}
            />
          </Paper>
          <Typography variant="h6">Save in</Typography>
          {isLoading && showFetchingDataMessage}
          {!isLoading && <Box>{list("bottom")}</Box>}
        </Box>
      </Drawer>
    </Fragment>
  );
}
