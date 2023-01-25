import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import type { SearchBarProps } from "./types";

export const SearchBar = ({
  placeholder,
  value,
  onChange,
  openFilters,
}: SearchBarProps) => {
  return (
    <TextField
      size="small"
      sx={{ fontSize: 14 }}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {openFilters && (
              <IconButton onClick={openFilters} sx={{ padding: "5px" }}>
                <FilterAltIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};
