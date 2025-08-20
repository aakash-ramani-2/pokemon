import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = 'Something went wrong',
  onRetry,
  showRetry = true
}) => {
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
        <ErrorOutlineIcon 
          sx={{ 
            fontSize: 64, 
            color: 'error.main',
            opacity: 0.7 
          }} 
        />
        <Typography variant="h6" color="text.primary">
          {message}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
          We encountered an error while loading the data. Please check your connection and try again.
        </Typography>
        {showRetry && onRetry && (
          <Button 
            variant="contained" 
            onClick={onRetry}
            sx={{ mt: 2 }}
          >
            Try again
          </Button>
        )}
      </Stack>
    </Box>
  );
};