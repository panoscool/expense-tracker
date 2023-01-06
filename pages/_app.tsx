import type { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';
import Layout from '../layout';
import AppProvider from '../context/app-context';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="description"
          content="Keep track of expenses, share with others, split expenses, view analytics and more"
        />
        <meta name="keywords" content="expense tracker, money tracking, expenses split" />
        <meta name="viewport" content="initial-scale=1, width=device-width, minimum-scale=1, maximum-scale=5.0" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="icon" href="/favicon.ico" />
        <title>Expense Tracker</title>
      </Head>

      <AppProvider>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </CacheProvider>
  );
}

export default MyApp;
