import { useLoaderData } from "react-router-dom";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import addSongToPlayList from "../helpers/addSongTOPlayList";

export default function AddToPlayList() {
  const lists = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const songToAdd = location.state.songToAdd;
  const token = location.state.token;
  console.log(token);

  function handleOnClick(id) {
    console.log(`playlist id ${id}`);
    console.log(`Song to Add ${songToAdd}`);

    addSongToPlayList(id, songToAdd, "POST", token);
    navigate("/");
  }
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "row",
        flexWrap: "wrap",
      }}
    >
      {lists.map((list) => {
        console.log(list);
        return (
          <Card
            sx={{ maxWidth: 345, margin: "10px 10px" }}
            key={list.id}
            onClick={() => handleOnClick(list.id)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={list.images[0].url}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {list.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to Add To PlayList
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Container>
  );
}
