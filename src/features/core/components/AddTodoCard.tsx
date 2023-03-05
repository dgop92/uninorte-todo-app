import Typography from "@mui/material/Typography";
import { PrimaryButton } from "../../../components/buttons";
import { TextField } from "../../../components/TextField";
import { BaseCard } from "./BaseCard";

export function AddTodoCard() {
  return (
    <BaseCard direction="column" width={400}>
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
      <TextField name="title" label="Title" />
      <PrimaryButton sx={{ mt: 2 }}>Create</PrimaryButton>
    </BaseCard>
  );
}
