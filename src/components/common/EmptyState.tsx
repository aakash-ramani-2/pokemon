import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface EmptyStateProps {
  type?: 'search' | 'favorites' | 'general';
  message?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  type = 'general',
  message,
  onAction,
  actionLabel
}) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <SearchOffIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.7 }} />;
      case 'favorites':
        return <FavoriteBorderIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.7 }} />;
      default:
        return <SearchOffIcon sx={{ fontSize: 64, color: 'text.secondary', opacity: 0.7 }} />;
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'search':
        return 'No items found';
      case 'favorites':
        return 'No favorites yet';
      default:
        return 'No items available';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'search':
        return 'Try adjusting your search terms or filters to find what you\'re looking for.';
      case 'favorites':
        return 'Start exploring and add items to your favorites by clicking the heart icon.';
      default:
        return 'There are no items to display at the moment.';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        p: 3,
        textAlign: 'center'
      }}
    >
      <Stack spacing={2} alignItems="center">
        {getIcon()}
        <Typography variant="h6" color="text.primary">
          {message || getDefaultMessage()}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
          {getDescription()}
        </Typography>
        {onAction && actionLabel && (
          <Button 
            variant="outlined" 
            onClick={onAction}
            sx={{ mt: 2 }}
          >
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Box>
  );
};