import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Container } from "@mui/material";
import { useState } from "react";
// import makeSpotifySearch from "../helpers/makeSpotifySearch";
import SearchList from "../components/SearchList";
import { useRouteLoaderData } from "react-router-dom";
export default function SearchPage() {
  const [searchResults, setSearchResults] = useState("");
  const [songToSearch, setSongToSearch] = useState("");
  const spotifyApi = useRouteLoaderData("root");

  function handleOnChange(event) {
    setSongToSearch(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const results = await spotifyApi.searchTracks(songToSearch);
    setSearchResults(results);
    setSongToSearch("");
  }

  return (
    <Box
      sx={{
        p: "8px 8px",
        m: "4px 4px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
            placeholder="Search Song"
            inputProps={{ "aria-label": "search Song" }}
            onChange={handleOnChange}
            value={songToSearch}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box
          sx={{
            p: "0px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {searchResults && <SearchList searchResultsSongs={searchResults} />}
        </Box>
      </Container>
    </Box>
  );
}
