import { createFileRoute } from "@tanstack/react-router";
import { Stack, Typography, Button } from "@mui/material";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack
      alignItems="center"
      spacing={4}
      sx={{ maxWidth: "600px", mx: "auto", p: 4 }}
    >
      <Typography variant="h2" textAlign="center">
        Welcome to Bigger AI Game!
      </Typography>
      <Typography variant="body1" textAlign="center">
        Try to think of things that are bigger than the previous item. How far
        can you go?
      </Typography>
      <Button
        component={Link}
        to="/game"
        variant="contained"
        size="large"
        color="primary"
      >
        Start Game
      </Button>
    </Stack>
  );
}
