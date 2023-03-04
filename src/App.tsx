import { CssBaseline } from "@mui/material";
import { AppProvider } from "./providers/AppProvider";

function App() {
  return (
    <AppProvider>
      <CssBaseline />
      <div>hellow</div>
    </AppProvider>
  );
}

export default App;
