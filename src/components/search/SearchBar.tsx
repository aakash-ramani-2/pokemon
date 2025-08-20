import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search items...',
  debounceMs = 300
}) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, debounceMs);

  // Sync debounced value with parent
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  // Sync external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClear = () => {
    setLocalValue('');
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: localValue && (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClear}
              edge="end"
              size="small"
              aria-label="Clear search"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.paper'
        }
      }}
    />
  );
};