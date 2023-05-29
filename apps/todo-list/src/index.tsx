import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import { App } from 'app/App';
import { store } from 'store';
import { theme } from 'theme';
import { GlobalStyle } from 'GlobalStyle';
import { DEFAULT_CACHE_TIME, DEFAULT_STALE_TIME } from 'common/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      staleTime: DEFAULT_STALE_TIME,
      cacheTime: DEFAULT_CACHE_TIME,
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Normalize />
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
