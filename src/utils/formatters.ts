import { DatasetType, SortOption, FilterType } from '../types/enums';

export const formatItemCount = (count: number): string => {
  if (count === 0) return 'No items';
  if (count === 1) return '1 item';
  return `${count.toLocaleString()} items`;
};

export const formatPageInfo = (current: number, total: number): string => {
  return `Page ${current} of ${total}`;
};

export const formatSearchQuery = (query: string): string => {
  return query.trim().toLowerCase();
};

export const formatSortLabel = (sort: SortOption): string => {
  switch (sort) {
    case SortOption.NAME_ASC:
      return 'Name (A-Z)';
    case SortOption.NAME_DESC:
      return 'Name (Z-A)';
    case SortOption.ID_ASC:
      return 'ID (Low to High)';
    case SortOption.ID_DESC:
      return 'ID (High to Low)';
    case SortOption.POPULARITY_ASC:
      return 'Popularity (Low to High)';
    case SortOption.POPULARITY_DESC:
      return 'Popularity (High to Low)';
    default:
      return 'Default';
  }
};

export const formatFilterLabel = (filter: FilterType): string => {
  switch (filter) {
    case FilterType.ALL:
      return 'All Items';
    case FilterType.FAVORITES:
      return 'Favorites';
    case FilterType.TYPE:
      return 'By Type';
    case FilterType.STATUS:
      return 'By Status';
    case FilterType.SPECIES:
      return 'By Species';
    default:
      return 'Filter';
  }
};

export const formatDatasetLabel = (dataset: DatasetType): string => {
  switch (dataset) {
    case DatasetType.POKEMON:
      return 'Pokémon';
    case DatasetType.RICK_AND_MORTY:
      return 'Rick & Morty';
    case DatasetType.OPEN_LIBRARY:
      return 'Open Library';
    default:
      return 'Dataset';
  }
};