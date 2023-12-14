import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export default function LibraryPage() {
  const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: "center",
  }));
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "98%",
      }}
    >
      <DemoPaper square>PlayList 1</DemoPaper>
      <DemoPaper square>PlayList 2</DemoPaper>
      <DemoPaper square>PlayList 1</DemoPaper>
      <DemoPaper square>PlayList 2</DemoPaper>
    </Stack>
  );
}
