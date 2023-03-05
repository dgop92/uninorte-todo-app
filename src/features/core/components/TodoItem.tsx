import * as dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { Todo } from "../entities/todo";
import { BaseCard } from "./BaseCard";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
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
      />
      <Stack>
        <Typography variant="body1" sx={{ py: 0.5, mt: 0.2 }}>
          {todo.title}
        </Typography>
        <Typography variant="body2">
          Due: {dayjs(todo.dueDate).format("YYYY-MM-DD")}
        </Typography>
      </Stack>
    </BaseCard>
  );
}
