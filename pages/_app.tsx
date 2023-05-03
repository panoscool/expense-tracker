import type { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Analytics } from '@vercel/analytics/react';
import createEmotionCache from '../styles/createEmotionCache';
import AppProvider from '../context/app-context';
import Metatags from '../components/meta-tags';
import { getMetatagsByPage } from '../lib/utils/get-metatags-by-page';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props;

  const meta = getMetatagsByPage(router.pathname);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="keywords" content="expense tracker, money tracking, split expenses, money statistics" />
        <meta name="viewport" content="initial-scale=1, width=device-width, minimum-scale=1, maximum-scale=5.0" />
        <link rel="icon" href="/favicon.ico" />

        <Metatags title={meta.title} description={meta.description} image={meta.image} path={router.pathname} />
      </Head>

      <AppProvider>
        <CssBaseline />
        <Component {...pageProps} />
        <Analytics />
      </AppProvider>
    </CacheProvider>
  );
}

export default MyApp;
