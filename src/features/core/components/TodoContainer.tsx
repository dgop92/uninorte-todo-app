import Stack from "@mui/material/Stack";
import { SearchTodoHeader } from "./SearchTodoHeader";
import { TodoItem } from "./TodoItem";

const TODOS = [
  {
    id: 1,
    title: "This is my first task",
    completed: false,
    createdAt: new Date(),
    dueDate: new Date("2023-03-24T01:32:53.104Z"),
  },
  {
    id: 2,
    title: "This is my second task",
    completed: false,
    createdAt: new Date("2023-01-04T01:32:53.104Z"),
    dueDate: new Date("2023-02-15T01:32:53.104Z"),
  },
  {
    id: 3,
    title: "Our unknown title",
    completed: true,
    createdAt: new Date("2023-02-04T01:32:53.104Z"),
    dueDate: new Date("2023-05-24T01:32:53.104Z"),
  },
];

export function TodoContainer() {
  return (
    <Stack flexGrow={1}>
      <SearchTodoHeader />
      <Stack gap={1} mt={4}>
        {TODOS.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </Stack>
    </Stack>
  );
}
