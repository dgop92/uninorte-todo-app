import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { TodoHeader } from "./TodoHeader";
import { TodoItem } from "./TodoItem";
import { Todo } from "../entities/todo";

interface TodoContainerProps {
  todos: Todo[];
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  loading: boolean;
  showPendingOnly: boolean;
  onShowPendingOnlyChange: (showPendingOnly: boolean) => void;
}

export function TodoContainer({
  todos,
  loading,
  searchTerm,
  setSearchTerm,
  showPendingOnly,
  onShowPendingOnlyChange,
}: TodoContainerProps) {
  return (
    <Stack flexGrow={1}>
      <TodoHeader
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        showPendingOnly={showPendingOnly}
        onShowPendingOnlyChange={onShowPendingOnlyChange}
      />
      {loading && (
        <LinearProgress sx={{ mt: 5, width: "95%", alignSelf: "center" }} />
      )}
      <Box
        my={4}
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
