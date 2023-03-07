import ToggleButton from "@mui/material/ToggleButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TextField } from "../../../components/TextField";
import { BaseCard } from "./BaseCard";

interface TodoHeaderProps {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
  showPendingOnly: boolean;
  onShowPendingOnlyChange: (showPendingOnly: boolean) => void;
}

export function TodoHeader({
  searchTerm,
  onSearchTermChange,
  showPendingOnly,
  onShowPendingOnlyChange,
}: TodoHeaderProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <BaseCard
      sx={{
        padding: {
          xs: "0.5rem 1rem",
          lg: "1rem 1.5rem",
        },
      }}
      direction="row"
      alignItems="center"
    >
      <TextField
        name="search"
        label="Search"
        value={searchTerm}
        onChange={onChange}
      />
      <ToggleButton
        color="primary"
        value="check"
        selected={showPendingOnly}
        onChange={() => onShowPendingOnlyChange(!showPendingOnly)}
        sx={{
          height: "fit-content",
          mx: 1,
          mt: 0.5,
          fontSize: "1.6rem",
          borderRadius: "1rem",
        }}
      >
        <MoreHorizIcon fontSize="inherit" />
      </ToggleButton>
    </BaseCard>
  );
}
