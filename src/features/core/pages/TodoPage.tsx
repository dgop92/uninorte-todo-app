import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { AddTodoCard } from "../components/AddTodoCard";
import { TodoContainer } from "../components/TodoContainer";

export function TodoPage() {
  return (
    <Stack /* height="100%" */>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontFamily: "titleFontFamily",
          fontWeight: 700,
          textAlign: "center",
          fontSize: 64,
          px: 2,
          py: 6,
        }}
      >
        Uninorte Todo App
      </Typography>
      <Stack
        direction="row"
        width="100%"
        alignItems="flex-start"
        maxWidth={1600}
        // flexGrow={1}
        margin="auto"
        gap={2}
        px={2}
      >
        <AddTodoCard />
        <TodoContainer />
      </Stack>
    </Stack>
  );
}
