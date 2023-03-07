import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { AddTodo } from "../components/AddTodo";
import { TodoContainer } from "../components/TodoContainer";
import { useThemeMediaQuery } from "../../../styles/hooks";
import { AddTodoModal } from "../components/AddTodoModal";

export function TodoPage() {
  const isDownLg = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [open, setOpen] = useState(false);

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
        <TodoContainer />
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
