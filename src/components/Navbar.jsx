import { AppBar, Toolbar, Grid, Tabs, Tab } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [value, setValue] = useState(0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={12}>
            <Tabs
              centered
              value={value}
              indicatorColor="secondary"
              onChange={(event, val) => setValue(val)}
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
            </Tabs>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
