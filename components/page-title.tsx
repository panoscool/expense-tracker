import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { getMetatagsByPage } from '../lib/utils/get-metatags-by-page';

export default function PageTitle() {
  const router = useRouter();

  const meta = useMemo(() => getMetatagsByPage(router.pathname), [router.pathname]);

  return (
    <Head>
      <title>{meta.title}</title>
    </Head>
  );
}
