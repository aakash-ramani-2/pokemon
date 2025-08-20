import React, { useEffect, useState, useCallback } from 'react';
import { Container, Stack, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import {
  setDataset,
  setSearchQuery,
  setSortBy,
  setFilterBy,
  setSelectedType,
  setCurrentPage,
  setItemsPerPage,
  toggleFavorite,
  setLoadingState,
  setError,
  resetFilters
} from '../store/store';
import { DatasetType, FilterType, SortOption, LoadingState } from '../types/enums';
import { Header } from './layout/Header';
import { SearchBar } from './search/SearchBar';
import { FilterControls } from './search/FilterControls';
import { ItemsList } from './items/ItemsList';
import { ItemDetail } from './items/ItemDetail';
import { useFavorites } from '../hooks/useFavorites';
import { useURLSync } from '../hooks/useURLSync';
import { useAbortController } from '../hooks/useAbortController';
import {
  useGetPokemonListQuery,
  useGetPokemonDetailQuery,
  useGetRickAndMortyListQuery,
  useGetRickAndMortyDetailQuery
} from '../services/api';

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentDataset } = useSelector((state: RootState) => state.app);
  const { favorites, toggleFavorite: toggleFav } = useFavorites();
  
  const itemId = parseInt(id || '0', 10);
  
  const pokemonQuery = useGetPokemonDetailQuery(itemId, {
    skip: currentDataset !== DatasetType.POKEMON
  });
  
  const rickAndMortyQuery = useGetRickAndMortyDetailQuery(itemId, {
    skip: currentDataset !== DatasetType.RICK_AND_MORTY
  });
  
  const query = currentDataset === DatasetType.POKEMON ? pokemonQuery : rickAndMortyQuery;
  
  const handleBack = () => {
    navigate('/');
  };
  
  const handleFavoriteToggle = () => {
    toggleFav(itemId);
    dispatch(toggleFavorite(itemId));
  };
  
  if (query.isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <div>Loading...</div>
      </Container>
    );
  }
  
  if (query.error || !query.data) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <div>Item not found</div>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <ItemDetail
        item={query.data}
        dataset={currentDataset}
        isFavorite={favorites.includes(itemId)}
        onFavoriteToggle={handleFavoriteToggle}
        onBack={handleBack}
      />
    </Container>
  );
};

const ItemsListPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    currentDataset,
    searchQuery,
    sortBy,
    filterBy,
    selectedType,
    currentPage,
    itemsPerPage,
    loadingState,
    error
  } = useSelector((state: RootState) => state.app);
  
  const { favorites, toggleFavorite: toggleFav } = useFavorites();
  const { syncToURL, getStateFromURL } = useURLSync();
  const { getController } = useAbortController();
  
  // Initialize state from URL on mount
  useEffect(() => {
    const urlState = getStateFromURL();
    if (urlState.dataset) dispatch(setDataset(urlState.dataset));
    if (urlState.search) dispatch(setSearchQuery(urlState.search));
    if (urlState.sort) dispatch(setSortBy(urlState.sort));
    if (urlState.filter) dispatch(setFilterBy(urlState.filter));
    if (urlState.page) dispatch(setCurrentPage(urlState.page));
  }, [dispatch, getStateFromURL]);
  
  // Sync state to URL when it changes
  useEffect(() => {
    syncToURL({
      dataset: currentDataset,
      search: searchQuery,
      sort: sortBy,
      filter: filterBy,
      page: currentPage
    });
  }, [currentDataset, searchQuery, sortBy, filterBy, currentPage, syncToURL]);
  
  // API queries
  const pokemonQuery = useGetPokemonListQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery,
    type: filterBy === FilterType.TYPE && selectedType ? selectedType : undefined,
  }, {
    skip: currentDataset !== DatasetType.POKEMON
  });
  
  const rickAndMortyQuery = useGetRickAndMortyListQuery({
    page: currentPage,
    name: searchQuery,
  }, {
    skip: currentDataset !== DatasetType.RICK_AND_MORTY
  });
  
  const query = currentDataset === DatasetType.POKEMON ? pokemonQuery : rickAndMortyQuery;
  
  // Filter and sort items
  const filteredAndSortedItems = React.useMemo(() => {
    if (!query.data?.results) return [];
    
    let items = [...query.data.results];
    
    // Apply favorites filter
    if (filterBy === FilterType.FAVORITES) {
      items = items.filter(item => favorites.includes(item.id));
    }
    
    // Apply sorting
    items.sort((a, b) => {
      switch (sortBy) {
        case SortOption.NAME_ASC:
          return a.name.localeCompare(b.name);
        case SortOption.NAME_DESC:
          return b.name.localeCompare(a.name);
        case SortOption.ID_ASC:
          return a.id - b.id;
        case SortOption.ID_DESC:
          return b.id - a.id;
        default:
          return 0;
      }
    });
    
    return items;
  }, [query.data?.results, filterBy, favorites, sortBy]);
  
  // Calculate pagination based on filtered results
  const isFiltered = filterBy === FilterType.FAVORITES;
  const totalFilteredItems = isFiltered ? filteredAndSortedItems.length : (query.data?.count || query.data?.info?.count || 0);
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
  const totalItems = totalFilteredItems;
  
  // Apply pagination to filtered results
  const paginatedItems = React.useMemo(() => {
    if (!isFiltered) return filteredAndSortedItems;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedItems.slice(startIndex, endIndex);
  }, [filteredAndSortedItems, currentPage, itemsPerPage, isFiltered]);
  
  const handleSearchChange = useCallback((value: string) => {
    dispatch(setSearchQuery(value));
    dispatch(setCurrentPage(1));
  }, [dispatch]);
  
  
  const handleFilterChange = useCallback((filter: FilterType) => {
    dispatch(setFilterBy(filter));
    dispatch(setCurrentPage(1));
  }, [dispatch]);
  
  // Reset to page 1 if current page exceeds total pages after filtering
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      dispatch(setCurrentPage(1));
    }
  }, [currentPage, totalPages, dispatch]);

  const handleTypeChange = useCallback((type: string) => {
    dispatch(setSelectedType(type));
    dispatch(setCurrentPage(1));
  }, [dispatch]);
  
  const handleSortChange = useCallback((sort: SortOption) => {
    dispatch(setSortBy(sort));
  }, [dispatch]);

  const handleItemsPerPageChange = useCallback((itemsPerPage: number) => {
    dispatch(setItemsPerPage(itemsPerPage));
  }, [dispatch]);
  
  const handlePageChange = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
  }, [dispatch]);
  
  const handleItemClick = useCallback((id: number) => {
    navigate(`/items/${id}`);
  }, [navigate]);
  
  const handleFavoriteToggle = useCallback((id: number) => {
    toggleFav(id);
    dispatch(toggleFavorite(id));
  }, [toggleFav, dispatch]);
  
  const handleReset = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);
  
  const handleRetry = useCallback(() => {
    query.refetch();
  }, [query]);
  
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack spacing={3}>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
        <FilterControls
          dataset={currentDataset}
          filterBy={filterBy}
          selectedType={selectedType}
          sortBy={sortBy}
          itemsPerPage={itemsPerPage}
          onFilterChange={handleFilterChange}
          onTypeChange={handleTypeChange}
          onSortChange={handleSortChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          onReset={handleReset}
        />
        
        <ItemsList
          items={paginatedItems}
          dataset={currentDataset}
          favorites={favorites}
          loadingState={query.isLoading ? LoadingState.LOADING : LoadingState.SUCCESS}
          error={query.error ? 'Failed to load items' : null}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          searchQuery={searchQuery}
          isFiltered={isFiltered}
          onItemClick={handleItemClick}
          onFavoriteToggle={handleFavoriteToggle}
          onPageChange={handlePageChange}
          onRetry={handleRetry}
        />
      </Stack>
    </Container>
  );
};

export const ResourceExplorer: React.FC = () => {
  return (
    <Router>
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}>
        <Header />
        <Routes>
          <Route path="/" element={<ItemsListPage />} />
          <Route path="/items/:id" element={<ItemDetailPage />} />
          <Route path="*" element={<ItemsListPage />} />
        </Routes>
      </Box>
    </Router>
  );
};