import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { store } from './app/store';
import { theme } from './lib/theme';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications position="top-right" zIndex={2077} limit={5} />
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
