import { Box } from "@mui/material";
import MusicPlayer from "../components/MusicPlayer";
import PropTypes from "prop-types";

export default function HomePage({ spotifyToken }) {
  console.log(spotifyToken);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight={500}
    >
      {spotifyToken && <MusicPlayer token={spotifyToken} />};
    </Box>
  );
}
//propTypes
HomePage.propTypes = {
  spotifyToken: PropTypes.string.isRequired,
};
