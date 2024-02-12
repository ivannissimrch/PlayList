import { Card, CardContent, Typography, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { useRouteError } from "react-router-dom";
import Login from "../components/Login";

export default function ErrorPage() {
  const error = useRouteError();
  let isTokenValid = true;
  let message = "Error Ocurred";
  if (error.status === 401) {
    localStorage.removeItem("token");
    isTokenValid = false;
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
      {isTokenValid && <Navbar />}
      <Container fluid>
        <Card>
          <CardContent>{message}</CardContent>
        </Card>
      </Container>
    </div>
  );
}
