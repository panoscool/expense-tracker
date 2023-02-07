import Head from 'next/head';
import metatags from '../lib/data/metatags.json';

type MetaKeys = keyof typeof metatags;

export default function PageTitle({ page }: { page: MetaKeys }) {
  return (
    <Head>
      <title>{metatags[page].title}</title>
    </Head>
  );
}
