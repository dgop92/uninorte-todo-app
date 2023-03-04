import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { muiTheme } from "../styles/theme";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
}
