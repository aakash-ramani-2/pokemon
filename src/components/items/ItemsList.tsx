import React from 'react';
import { Box, Typography, Stack, Pagination } from '@mui/material';
import { PokemonItem, RickAndMortyItem } from '../../types/schema';
import { DatasetType, LoadingState } from '../../types/enums';
import { ItemCard } from './ItemCard';
import { LoadingState as LoadingComponent } from '../common/LoadingState';
import { ErrorState } from '../common/ErrorState';
import { EmptyState } from '../common/EmptyState';
import { formatItemCount } from '../../utils/formatters';

interface ItemsListProps {
  items: (PokemonItem | RickAndMortyItem)[];
  dataset: DatasetType;
  favorites: number[];
  loadingState: LoadingState;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  searchQuery: string;
  isFiltered?: boolean;
  onItemClick: (id: number) => void;
  onFavoriteToggle: (id: number) => void;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

export const ItemsList: React.FC<ItemsListProps> = ({
  items,
  dataset,
  favorites,
  loadingState,
  error,
  currentPage,
  totalPages,
  totalItems,
  searchQuery,
  isFiltered = false,
  onItemClick,
  onFavoriteToggle,
  onPageChange,
  onRetry
}) => {
  if (loadingState === LoadingState.LOADING) {
    return <LoadingComponent variant="cards" />;
  }

  if (loadingState === LoadingState.ERROR || error) {
    return <ErrorState message={error || undefined} onRetry={onRetry} />;
  }

  if (items.length === 0) {
    const emptyType = searchQuery ? 'search' : isFiltered ? 'favorites' : 'general';
    return <EmptyState type={emptyType} />;
  }

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="h2">
          {searchQuery ? `Search results for "${searchQuery}"` : 'All Items'}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Showing {items.length} of {formatItemCount(totalItems)}
          </Typography>
          {totalPages > 1 && (
            <Typography variant="body2" color="text.secondary">
              Page {currentPage} of {totalPages}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 2
        }}
      >
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            dataset={dataset}
            isFavorite={favorites.includes(item.id)}
            onFavoriteToggle={() => onFavoriteToggle(item.id)}
            onClick={() => onItemClick(item.id)}
          />
        ))}
      </Box>

      {totalPages > 1 && (
        <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </Stack>
  );
};