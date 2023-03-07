import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { SearchTodoHeader } from "./SearchTodoHeader";
import { TodoItem } from "./TodoItem";
import { Todo } from "../entities/todo";

interface TodoContainerProps {
  todos: Todo[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  loading: boolean;
}

export function TodoContainer({
  todos,
  loading,
  searchTerm,
  setSearchTerm,
}: TodoContainerProps) {
  return (
    <Stack flexGrow={1}>
      <SearchTodoHeader
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      {loading && (
        <LinearProgress sx={{ mt: 5, width: "95%", alignSelf: "center" }} />
      )}
      <Box
        mt={4}
        gap={2}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fill, minmax(300px, 1fr))",
            md: "repeat(auto-fill, minmax(500px, 1fr))",
          },
          overflow: "auto",
        }}
      >
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Box>
    </Stack>
  );
}
