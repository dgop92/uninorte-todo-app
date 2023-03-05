import { TextField } from "../../../components/TextField";
import { BaseCard } from "./BaseCard";

export function SearchTodoHeader() {
  return (
    <BaseCard direction="row">
      <TextField name="search" label="Search" />
    </BaseCard>
  );
}
