import metatags from '../data/metatags.json';

type MetaKeys = keyof typeof metatags;

export const getMetatagsByPage = (path: string) => {
  const page = path.replace('/', '') as MetaKeys;

  return metatags[page] ? metatags[page] : metatags['home'];
};
