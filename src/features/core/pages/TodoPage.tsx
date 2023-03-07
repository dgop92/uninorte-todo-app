import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { AddTodo } from "../components/AddTodo";
import { TodoContainer } from "../components/TodoContainer";
import { useThemeMediaQuery } from "../../../styles/hooks";
import { AddTodoModal } from "../components/AddTodoModal";
import { Todo } from "../entities/todo";
import { todoRepository } from "../repositories/repository-factory";

export function TodoPage() {
  const isDownLg = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [open, setOpen] = useState(false);
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

  const onClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const onNewTodo = () => {
    enqueueSnackbar("New todo added", {
      variant: "success",
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
    fetchTodos();
  };

  return (
    <Stack>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontFamily: "titleFontFamily",
          fontWeight: 700,
          textAlign: "center",
          fontSize: { lg: 64, md: 48, xs: 32 },
          px: 2,
          py: 6,
        }}
      >
        Uninorte Todo App
      </Typography>
      <Stack
        direction="row"
        width="100%"
        alignItems="flex-start"
        alignSelf="center"
        maxWidth={1600}
        gap={2}
        sx={{ px: { xs: 1, sm: 2 } }}
      >
        {isDownLg ? (
          <AddTodoModal open={open} onClose={onClose}>
            <AddTodo cardWidth="100%" onNewTodo={onNewTodo} />
          </AddTodoModal>
        ) : (
          <AddTodo cardWidth={500} onNewTodo={onNewTodo} />
        )}
        <TodoContainer
          todos={todos}
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </Stack>
      {isDownLg && (
        <Fab
          onClick={() => setOpen(true)}
          color="primary"
          aria-label="add"
          sx={{ position: "sticky", bottom: 18, alignSelf: "flex-end", mr: 2 }}
        >
          <AddIcon />
        </Fab>
      )}
    </Stack>
  );
}
