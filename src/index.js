import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { SettingsManager } from './Context/Settings';
import AuthProvider from './Context/Auth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SettingsManager>
      <AuthProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            breakpoints: {
              xs: '30em',
              sm: '48em',
              md: '64em',
              lg: '74em',
              xl: '90em',
            },
          }}
        >
          <App />
        </MantineProvider>
      </AuthProvider>
    </SettingsManager>
  </React.StrictMode>
);
