import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../entities/todo";
import { BaseCard } from "./BaseCard";
import { todoRepository } from "../repositories/repository-factory";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient();

  const statusChangeMutation = useMutation({
    mutationFn: async () => {
      const result = await todoRepository.changeTodoStatus(todo);
      return result;
    },
    onError() {
      console.log("status change mutation error");
    },
    onSuccess() {
      console.log("status change mutation success");
      // invalidate all todos and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteChangeMutation = useMutation({
    mutationFn: async () => {
      await todoRepository.delete(todo.id);
    },
    onError() {
      console.log("delete mutation error");
    },
    onSuccess() {
      console.log("delete mutation success");
      // invalidate all todos and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

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
        onChange={async () => {
          await statusChangeMutation.mutateAsync();
        }}
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
        onClick={async () => {
          await deleteChangeMutation.mutateAsync();
        }}
        sx={{ height: "fit-content", mx: 1, alignSelf: "center" }}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </BaseCard>
  );
}
