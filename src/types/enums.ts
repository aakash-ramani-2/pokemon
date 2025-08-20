// Dataset type enum for API selection
export enum DatasetType {
  POKEMON = 'pokemon',
  RICK_AND_MORTY = 'rick-and-morty',
  OPEN_LIBRARY = 'open-library'
}

// Sort options enum
export enum SortOption {
  NAME_ASC = 'name-asc',
  NAME_DESC = 'name-desc',
  ID_ASC = 'id-asc',
  ID_DESC = 'id-desc',
  POPULARITY_ASC = 'popularity-asc',
  POPULARITY_DESC = 'popularity-desc'
}

// Filter types enum
export enum FilterType {
  ALL = 'all',
  FAVORITES = 'favorites',
  TYPE = 'type',
  STATUS = 'status',
  SPECIES = 'species'
}

// Loading state enum
export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

// Theme mode enum
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}