import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function LoadingCircle() {
  return (
    <Stack alignItems="center">
      <CircularProgress />
    </Stack>
  );
}
