import { Box, Card, CardContent, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export default function HomePage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight={500}
    >
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Live From Space
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Mac Miller
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label="next">
              <SkipNextIcon />
            </IconButton>
          </Box>
        </Box>
        {/* <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://www.pexels.com/photo/bridge-near-waterfall-358457"
          alt="Live from space album cover"
        /> */}
      </Card>
    </Box>
  );
}
