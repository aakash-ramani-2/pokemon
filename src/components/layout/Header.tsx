import React from 'react';
import { AppBar, Toolbar, Typography, Box, Stack } from '@mui/material';
import { ThemeToggle } from '../common/ThemeToggle';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Resource Explorer' }) => {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          
          <Box>
            <ThemeToggle />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};