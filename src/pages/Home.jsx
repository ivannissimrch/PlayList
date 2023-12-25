import { Box } from "@mui/material";
import MusicPlayer from "../components/MusicPlayer";
import PropTypes from "prop-types";

export default function HomePage({ token }) {
  console.log(token);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight={500}
    >
      {token && <MusicPlayer token={token} />};
    </Box>
  );
}
//propTypes
HomePage.propTypes = {
  token: PropTypes.string.isRequired,
};
