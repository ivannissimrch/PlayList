import { Card, CardContent, Typography, Container } from "@mui/material";
import Navbar from "../components/Navbar";

export default function ErrorPage() {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Card>
          <CardContent>
            <Typography textAlign="center" variant="h5">
              Error Occurred
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
