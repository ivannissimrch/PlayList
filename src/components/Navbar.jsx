import { AppBar, Toolbar, Grid, Tabs, Tab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [value, setValue] = useState(0);

  function handleOnClick() {
    localStorage.removeItem("token");
    location.reload();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={12}>
            <Tabs
              centered
              value={value}
              indicatorColor="secondary"
              onChange={(event, newValue) => setValue(newValue)}
            >
              <Tab
                label={
                  <Link to="">
                    <HomeIcon fontSize="large" sx={{ color: "white" }} />
                  </Link>
                }
              />
              <Tab
                label={
                  <Link to="search">
                    <SearchIcon fontSize="large" sx={{ color: "white" }} />{" "}
                  </Link>
                }
              />
              <Tab
                label={
                  <Link to="library">
                    <LibraryMusicIcon
                      fontSize="large"
                      sx={{ color: "white" }}
                    />
                  </Link>
                }
              />
              <Tab
                label={
                  <Link to="/" onClick={handleOnClick}>
                    <LogoutIcon fontSize="large" sx={{ color: "white" }} />
                  </Link>
                }
              />
            </Tabs>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
