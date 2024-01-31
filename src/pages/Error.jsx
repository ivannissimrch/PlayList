import { Card, CardContent, Typography, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { useRouteError } from "react-router-dom";
import Login from "../components/Login";

export default function ErrorPage() {
  const error = useRouteError();
  // let tokenExpired = false;
  let message = "Error Ocurred";
  if (error.status === 401) {
    localStorage.removeItem("token");
    // tokenExpired = true;
    //TODO write code to hide navbar
    message = (
      <>
        <Typography textAlign="center" variant="h5">
          Token Expired please login again
        </Typography>
        <Login />
      </>
    );

    localStorage.removeItem("token");
  }
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Card>
          <CardContent>{message}</CardContent>
        </Card>
      </Container>
    </div>
  );
}
