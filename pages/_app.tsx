import type { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import createEmotionCache from '../styles/createEmotionCache';
import AppContextProvider from '../context/app-context';
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <Metatags title={meta.title} description={meta.description} image={meta.image} path={router.pathname} />
      </Head>

      <AppContextProvider>
        <CssBaseline />
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </AppContextProvider>
    </CacheProvider>
  );
}

export default MyApp;
