/* eslint-disable react/require-default-props */
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { PrimaryButton } from "../../../components/buttons";
import { TextField } from "../../../components/TextField";
import { BaseCard } from "./BaseCard";
import { Todo, TodoCreateInputSchema } from "../entities/todo";
import { TodoCreateInput } from "../schema-types";
import { todoRepository } from "../repositories/repository-factory";
import { validateDueDate } from "../utils/validations";

type TodoCreateInputForm = Omit<TodoCreateInput, "dueDate">;
const TodoCreateInputFormSchema = TodoCreateInputSchema.fork(
  ["dueDate"],
  (schema) => schema.optional()
);

interface AddTodoCardProps {
  cardWidth?: number | string;
}

export function AddTodo({ cardWidth = 500 }: AddTodoCardProps) {
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(
    dayjs().add(5, "day")
  );
  const [dueDateError, setDueDateError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: async (data: TodoCreateInputForm) => {
      if (validateDueDate(dueDate)) {
        const todo = await todoRepository.create({
          title: data.title,
          dueDate: dueDate.toDate(),
        });
        return todo;
      }
      throw new Error("Unexpected error, impossible to reach this point");
    },
    onError(error) {
      console.log("mutation error");
      if (error instanceof Error) {
        // TODO: make sure error is related to dueDate
        setDueDateError(error.message);
      }
    },
    onSuccess(data) {
      console.log("mutation success", data);
      enqueueSnackbar("New todo added", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      // invalidate all todos and refetch
      // queryClient.invalidateQueries({ queryKey: ["todos"] });

      // just update the cache, no need to refetch all todos
      // but we need to specify the filter params
      queryClient.setQueryData<Todo[]>(
        ["todos", { searchTerm: "", showPendingOnly: true }],
        (oldData) => {
          if (oldData) {
            return [...oldData, data];
          }
          return oldData;
        }
      );
    },
  });

  const onSubmit: SubmitHandler<TodoCreateInputForm> = async (data) => {
    await mutation.mutateAsync(data);
  };

  const handleChange = (date: dayjs.Dayjs | null) => {
    setDueDate(date);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoCreateInputForm>({
    resolver: joiResolver(TodoCreateInputFormSchema),
  });

  return (
    <BaseCard
      onSubmit={handleSubmit(onSubmit)}
      as="form"
      direction="column"
      sx={{ width: cardWidth }}
    >
      <Typography
        component="h6"
        sx={{
          fontFamily: "titleFontFamily",
          fontWeight: 700,
          fontSize: 22,
        }}
      >
        Add new todo
      </Typography>
      <TextField
        name="title"
        label="Title"
        inputProps={{
          ...register("title"),
        }}
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <DesktopDatePicker
        label="Due date"
        inputFormat="YYYY-MM-DD"
        value={dueDate}
        onChange={handleChange}
        renderInput={(params) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <TextField {...params} helperText={dueDateError} />
        )}
      />
      <PrimaryButton fullWidth type="submit" sx={{ mt: 2 }}>
        Create
      </PrimaryButton>
      <p>{mutation.isLoading && <span>Adding todo...</span>}</p>
    </BaseCard>
  );
}
