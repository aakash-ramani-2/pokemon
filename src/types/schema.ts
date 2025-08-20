import { DatasetType, SortOption, FilterType, LoadingState, ThemeMode } from './enums';

// Props types (data passed to components)
export interface AppProps {
  initialDataset?: DatasetType;
  initialTheme?: ThemeMode;
  enableAnalytics?: boolean;
  debugMode?: boolean;
}

export interface ItemListProps {
  dataset: DatasetType;
  searchQuery: string;
  sortBy: SortOption;
  filterBy: FilterType;
  currentPage: number;
  onItemClick: (id: number) => void;
  onFavoriteToggle: (id: number) => void;
}

export interface ItemDetailProps {
  itemId: number;
  dataset: DatasetType;
  onBack: () => void;
  onFavoriteToggle: (id: number) => void;
}

export interface SearchFilterProps {
  searchQuery: string;
  sortBy: SortOption;
  filterBy: FilterType;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterType) => void;
}

// Store types (global state data)
export interface AppState {
  currentDataset: DatasetType;
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  sortBy: SortOption;
  filterBy: FilterType;
  selectedFilters: string[];
  selectedType: string;
  favorites: number[];
  themeMode: ThemeMode;
  loadingState: LoadingState;
  error: string | null;
}

export interface FavoritesState {
  items: number[];
  lastUpdated: string;
}

export interface ThemeState {
  mode: ThemeMode;
  systemPreference: ThemeMode;
  userPreference: ThemeMode | null;
}

// Query types (API response data)
export interface PokemonItem {
  id: number;
  name: string;
  url: string;
  type: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  sprite: string;
}

export interface RickAndMortyItem {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
  info?: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}