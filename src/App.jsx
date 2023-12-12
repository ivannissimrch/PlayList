import { Grid, Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Navbar />

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Item>Music Player</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
