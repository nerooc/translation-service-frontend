import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import type { SearchBarProps } from './types';

export const SearchBar = ({placeholder, onChange}: SearchBarProps) => {
  return (
    <TextField
      size='small' 
      sx={{fontSize: 14}}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ), 
        endAdornment: (
          <InputAdornment position='end'>
            <FilterAltIcon />
          </InputAdornment>
        )
      }}
    />
  );
};
