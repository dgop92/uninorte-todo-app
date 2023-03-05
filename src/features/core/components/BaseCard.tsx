import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const BaseCard = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1.75),
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
}));
