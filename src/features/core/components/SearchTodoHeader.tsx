import { TextField } from "../../../components/TextField";
import { BaseCard } from "./BaseCard";

interface SearchTodoHeaderProps {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
}

export function SearchTodoHeader({
  searchTerm,
  onSearchTermChange,
}: SearchTodoHeaderProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <BaseCard direction="row">
      <TextField
        name="search"
        label="Search"
        value={searchTerm}
        onChange={onChange}
      />
    </BaseCard>
  );
}
