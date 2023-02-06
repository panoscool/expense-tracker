import { env } from '../lib/config/env';
import { Fragment } from 'react';

interface Props {
  title: string;
  description: string;
  path: string;
  image?: string;
}

const Metatags = ({ title, description, image, path }: Props) => {
  const url = `${env.baseUrl}${path}`;
  const imageUrl = `${env.baseUrl}${image}`;

  return (
    <Fragment>
      <meta name="title" content={title} key="title" />
      <meta name="description" content={description} key="description" />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
    </Fragment>
  );
};

export default Metatags;
