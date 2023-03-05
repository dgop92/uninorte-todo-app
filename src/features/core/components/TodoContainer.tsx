import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useCallback, useEffect, useState } from "react";
import { SearchTodoHeader } from "./SearchTodoHeader";
import { TodoItem } from "./TodoItem";
import { Todo } from "../entities/todo";
import { todoRepository } from "../repositories/repository-factory";

export function TodoContainer() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    const todosData = await todoRepository.getManyBy({
      sortBy: { dueDate: "asc" },
      searchBy: { title: searchTerm === "" ? undefined : searchTerm },
    });
    setTodos(todosData);
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

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
          gridTemplateColumns: "repeat(auto-fill, minmax(550px, 1fr))",
        }}
      >
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Box>
    </Stack>
  );
}
