import { CssBaseline } from "@mui/material";
import { TodoPage } from "./features/core/pages/TodoPage";
import { AppProvider } from "./providers/AppProvider";

function App() {
  return (
    <AppProvider>
      <CssBaseline />
      <TodoPage />
    </AppProvider>
  );
}

export default App;
