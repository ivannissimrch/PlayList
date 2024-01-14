import { Box } from "@mui/material";
import MusicPlayer from "../components/MusicPlayer";
import { useRouteLoaderData } from "react-router-dom";

export default function HomePage() {
  const token = useRouteLoaderData("root");
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight={500}
    >
      {token && <MusicPlayer />}
    </Box>
  );
}
