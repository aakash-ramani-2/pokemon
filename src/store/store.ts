import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DatasetType, SortOption, FilterType, LoadingState, ThemeMode } from '../types/enums';
import { AppState } from '../types/schema';
import { api } from '../services/api';

const initialState: AppState = {
  currentDataset: DatasetType.POKEMON,
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 20,
  totalItems: 0,
  sortBy: SortOption.NAME_ASC,
  filterBy: FilterType.ALL,
  selectedFilters: [],
  selectedType: '',
  favorites: [],
  themeMode: ThemeMode.LIGHT,
  loadingState: LoadingState.IDLE,
  error: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDataset: (state, action: PayloadAction<DatasetType>) => {
      state.currentDataset = action.payload;
      state.currentPage = 1; // Reset page when changing dataset
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset page when searching
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setFilterBy: (state, action: PayloadAction<FilterType>) => {
      state.filterBy = action.payload;
      state.currentPage = 1; // Reset page when filtering
      // Clear selected type when changing filter
      if (action.payload !== FilterType.TYPE) {
        state.selectedType = '';
      }
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
      state.currentPage = 1; // Reset page when changing type
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset page when changing items per page
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(fav => fav !== id);
      } else {
        state.favorites.push(id);
      }
    },
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    setLoadingState: (state, action: PayloadAction<LoadingState>) => {
      state.loadingState = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = '';
      state.filterBy = FilterType.ALL;
      state.selectedType = '';
      state.sortBy = SortOption.NAME_ASC;
      state.currentPage = 1;
    }
  }
});

export const {
  setDataset,
  setSearchQuery,
  setSortBy,
  setFilterBy,
  setSelectedType,
  setCurrentPage,
  setItemsPerPage,
  setTotalItems,
  toggleFavorite,
  setThemeMode,
  setLoadingState,
  setError,
  resetFilters
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    api: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;