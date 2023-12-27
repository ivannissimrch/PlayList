import { useLoaderData } from "react-router-dom";
import { Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function LibraryPage() {
  const lists = useLoaderData();
  console.log(lists);

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
        return (
          <Card sx={{ maxWidth: 345, margin: "10px 10px" }} key={list.id}>
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
                  {list.type}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Container>
  );
}
