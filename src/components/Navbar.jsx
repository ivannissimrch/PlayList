import { AppBar, Toolbar, Grid, Tabs, Tab, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  function handleOnClick() {
    localStorage.removeItem("token");
    navigate("/");
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

              <Button color="inherit" onClick={handleOnClick}>
                LogOut
              </Button>
            </Tabs>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
