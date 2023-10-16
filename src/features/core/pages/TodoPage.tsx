import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AddTodo } from "../components/AddTodo";
import { TodoContainer } from "../components/TodoContainer";
import { useThemeMediaQuery } from "../../../styles/hooks";
import { AddTodoModal } from "../components/AddTodoModal";
import { Todo } from "../entities/todo";
import { todoRepository } from "../repositories/repository-factory";

async function getTodos({
  searchTerm,
  showPendingOnly,
}: {
  searchTerm: string;
  showPendingOnly: boolean;
}) {
  const result = await todoRepository.getManyBy({
    sortBy: { dueDate: "asc" },
    searchBy: { title: searchTerm === "" ? undefined : searchTerm },
    filterBy: {
      completed: showPendingOnly ? false : undefined,
    },
  });
  return result;
}

export function TodoPage() {
  const isDownLg = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [open, setOpen] = useState(false);
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPendingOnly, setShowPendingOnly] = useState(true);
  // const [loading, setLoading] = useState(true);

  /*
  placeholderData: [], if you use placeholderData, you must use
  result.data! to access the data
  */

  const result = useQuery({
    queryKey: ["todos", { searchTerm, showPendingOnly }],
    queryFn: () => getTodos({ searchTerm, showPendingOnly }),
    staleTime: 20000,
  });

  const loading = result.isLoading;

  let todos: Todo[] = [];
  if (!loading && !result.isError) {
    todos = result.data;
  }

  if (result.isError) {
    console.log(result.error);
  }

  const onClose = () => {
    setOpen(false);
  };

  const onShowPendingOnlyChange = (pendingOnly: boolean) => {
    setShowPendingOnly(pendingOnly);
  };

  return (
    <Stack minHeight="100vh">
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
        flexGrow={1}
        maxWidth={1600}
        gap={2}
        sx={{ px: { xs: 1, sm: 2 } }}
      >
        {isDownLg ? (
          <AddTodoModal open={open} onClose={onClose}>
            <AddTodo cardWidth="100%" />
          </AddTodoModal>
        ) : (
          <AddTodo cardWidth={500} />
        )}
        <TodoContainer
          todos={todos}
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showPendingOnly={showPendingOnly}
          onShowPendingOnlyChange={onShowPendingOnlyChange}
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
