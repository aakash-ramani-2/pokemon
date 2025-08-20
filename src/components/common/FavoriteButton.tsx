import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
  size = 'medium',
  disabled = false
}) => {
  return (
    <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        size={size}
        disabled={disabled}
        sx={{
          color: isFavorite ? 'error.main' : 'text.secondary',
          '&:hover': {
            color: 'error.main',
            backgroundColor: 'error.main',
            opacity: 0.1
          }
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};