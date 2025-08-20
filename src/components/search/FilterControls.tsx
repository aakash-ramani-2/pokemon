import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Stack, Chip, Box } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FilterType, SortOption, DatasetType } from '../../types/enums';
import { formatFilterLabel, formatSortLabel, formatDatasetLabel } from '../../utils/formatters';

// Pokemon types for filtering
const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark',
  'steel', 'fairy'
];

interface FilterControlsProps {
  dataset: DatasetType;
  filterBy: FilterType;
  selectedType: string;
  sortBy: SortOption;
  itemsPerPage: number;
  onFilterChange: (filter: FilterType) => void;
  onTypeChange: (type: string) => void;
  onSortChange: (sort: SortOption) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  onReset: () => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  dataset,
  filterBy,
  selectedType,
  sortBy,
  itemsPerPage,
  onFilterChange,
  onTypeChange,
  onSortChange,
  onItemsPerPageChange,
  onReset
}) => {
  const hasActiveFilters = filterBy !== FilterType.ALL || sortBy !== SortOption.NAME_ASC;

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filterBy}
            label="Filter"
            onChange={(e) => onFilterChange(e.target.value as FilterType)}
            startAdornment={<FilterAltIcon sx={{ mr: 1, fontSize: 18 }} />}
          >
            <MenuItem value={FilterType.ALL}>
              {formatFilterLabel(FilterType.ALL)}
            </MenuItem>
            <MenuItem value={FilterType.FAVORITES}>
              {formatFilterLabel(FilterType.FAVORITES)}
            </MenuItem>
            {dataset === DatasetType.POKEMON && (
              <MenuItem value={FilterType.TYPE}>
                {formatFilterLabel(FilterType.TYPE)}
              </MenuItem>
            )}
            {dataset === DatasetType.RICK_AND_MORTY && (
              <>
                <MenuItem value={FilterType.STATUS}>
                  {formatFilterLabel(FilterType.STATUS)}
                </MenuItem>
                <MenuItem value={FilterType.SPECIES}>
                  {formatFilterLabel(FilterType.SPECIES)}
                </MenuItem>
              </>
            )}
          </Select>
        </FormControl>

        {/* Pokemon Type Selector - only show when Type filter is selected */}
        {dataset === DatasetType.POKEMON && filterBy === FilterType.TYPE && (
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Pokemon Type</InputLabel>
            <Select
              value={selectedType}
              label="Pokemon Type"
              onChange={(e) => onTypeChange(e.target.value)}
            >
              <MenuItem value="">
                <em>All Types</em>
              </MenuItem>
              {POKEMON_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => onSortChange(e.target.value as SortOption)}
          >
            <MenuItem value={SortOption.NAME_ASC}>
              {formatSortLabel(SortOption.NAME_ASC)}
            </MenuItem>
            <MenuItem value={SortOption.NAME_DESC}>
              {formatSortLabel(SortOption.NAME_DESC)}
            </MenuItem>
            <MenuItem value={SortOption.ID_ASC}>
              {formatSortLabel(SortOption.ID_ASC)}
            </MenuItem>
            <MenuItem value={SortOption.ID_DESC}>
              {formatSortLabel(SortOption.ID_DESC)}
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Per page</InputLabel>
          <Select
            value={itemsPerPage}
            label="Per page"
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <MenuItem value={10}>10 items</MenuItem>
            <MenuItem value={20}>20 items</MenuItem>
            <MenuItem value={50}>50 items</MenuItem>
            <MenuItem value={100}>100 items</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {hasActiveFilters && (
        <Box>
          <Chip
            label="Clear filters"
            variant="outlined"
            size="small"
            onDelete={onReset}
            sx={{ mr: 1 }}
          />
        </Box>
      )}
    </Stack>
  );
};