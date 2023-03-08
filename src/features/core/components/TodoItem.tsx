import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Todo } from "../entities/todo";
import { BaseCard } from "./BaseCard";

interface TodoItemProps {
  todo: Todo;
  onTodoStatusChange: (todo: Todo) => void;
  onTodoDeleted: (todo: Todo) => void;
}

export function TodoItem({
  todo,
  onTodoStatusChange,
  onTodoDeleted,
}: TodoItemProps) {
  return (
    <BaseCard
      direction="row"
      sx={{ padding: (theme) => `${theme.spacing(1)} ${theme.spacing(2)}` }}
    >
      <Checkbox
        sx={{
          "& .MuiSvgIcon-root": { fontSize: 22 },
          color: "primary.light",
          alignSelf: "baseline",
        }}
        checked={todo.completed}
        onChange={() => onTodoStatusChange(todo)}
      />
      <Stack flexGrow={1}>
        <Typography variant="body1" sx={{ py: 0.5, mt: 0.2 }}>
          {todo.title}
        </Typography>
        <Typography variant="body2">
          Due: {dayjs(todo.dueDate).format("YYYY-MM-DD")}
        </Typography>
      </Stack>
      <IconButton
        color="primary"
        size="medium"
        onClick={() => onTodoDeleted(todo)}
        sx={{ height: "fit-content", mx: 1, alignSelf: "center" }}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </BaseCard>
  );
}
