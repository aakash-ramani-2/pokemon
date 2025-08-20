import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { store } from './src/store/store';
import { ResourceExplorer } from './src/components/ResourceExplorer';
import { ThemeProvider } from './src/components/ThemeProvider';

const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true, // Theme styles will be inserted at lower precedence than other styles
  });
};

const emotionCache = createEmotionCache();

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeProvider>
          <CssBaseline />
          <ResourceExplorer />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
};

export default App;