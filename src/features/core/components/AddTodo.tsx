/* eslint-disable react/require-default-props */
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";
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
  onNewTodo: (todo: Todo) => void;
}

export function AddTodo({ onNewTodo, cardWidth = 500 }: AddTodoCardProps) {
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(
    dayjs().add(5, "day")
  );
  const [dueDateError, setDueDateError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<TodoCreateInputForm> = async (data) => {
    try {
      if (validateDueDate(dueDate)) {
        const todo = await todoRepository.create({
          title: data.title,
          dueDate: dueDate.toDate(),
        });
        onNewTodo(todo);
      }
    } catch (e) {
      if (e instanceof Error) {
        setDueDateError(e.message);
      }
    }
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
    </BaseCard>
  );
}
