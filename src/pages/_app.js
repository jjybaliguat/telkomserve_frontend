import { Fragment } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
// import { AuthConsumer, AuthProvider } from '../contexts/auth-context';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';
import { theme } from '../theme';
import { store } from '../lib/store';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import '../theme/additional.css'

registerChartJs();

let persistor = persistStore(store)
const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps: {session, ...pageProps} } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>
              RDNAKSICT
            </title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
                  {
                    getLayout(<>
                          <Component {...pageProps} />
                      </>)
                  }
            </ThemeProvider>
          </LocalizationProvider>
        </CacheProvider>
      </PersistGate>
      </Provider>
  );
};

export default App;
