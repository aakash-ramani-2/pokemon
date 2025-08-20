import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

interface LoadingStateProps {
  variant?: 'cards' | 'list' | 'detail';
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  variant = 'cards', 
  count = 8 
}) => {
  if (variant === 'detail') {
    return (
      <Box sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="60%" />
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rectangular" width={100} height={40} />
            <Skeleton variant="rectangular" width={100} height={40} />
          </Stack>
        </Stack>
      </Box>
    );
  }

  if (variant === 'list') {
    return (
      <Stack spacing={2} sx={{ p: 2 }}>
        {Array.from({ length: count }).map((_, index) => (
          <Stack key={index} direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} width="60%" />
            </Box>
            <Skeleton variant="rectangular" width={24} height={24} />
          </Stack>
        ))}
      </Stack>
    );
  }

  // Cards variant (default)
  return (
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 2,
        p: 2
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
          <Stack spacing={2}>
            <Skeleton variant="rectangular" width="100%" height={160} />
            <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton variant="text" width={80} />
              <Skeleton variant="circular" width={24} height={24} />
            </Stack>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};