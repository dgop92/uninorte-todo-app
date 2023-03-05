import Typography from "@mui/material/Typography";
import { Todo } from "../entities/todo";
import { BaseCard } from "./BaseCard";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <BaseCard direction="row" p={1}>
      <Typography variant="body1">{todo.title}</Typography>
    </BaseCard>
  );
}
