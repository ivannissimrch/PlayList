import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import makeSpotifySearch from "../helpers/makeSpotifySearch";
import SearchList from "../components/SearchList";

export default function SearchPage({ token }) {
  const [searchResults, setSearchResults] = useState("");
  const [songToSearch, setSongToSearch] = useState("");

  function handleOnChange(event) {
    setSongToSearch(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const results = await makeSpotifySearch(
      `q=remaster%2520track%3ADoxy%2520artist%3A${songToSearch}&type=track`,
      "GET",
      token
    );
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
        width: "100%",
        height: "100vh",
      }}
    >
      <Container>
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
          {searchResults && (
            <SearchList searchResults={searchResults} token={token} />
          )}
        </Box>
      </Container>
    </Box>
  );
}

//propTypes
SearchPage.propTypes = {
  token: PropTypes.string.isRequired,
};
