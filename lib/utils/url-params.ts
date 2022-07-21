import queryString from 'query-string';
import Router from 'next/router';

const stringifyOpts: any = { arrayFormat: 'comma', skipNull: true, skipEmptyString: true };
const parseOpts: any = { arrayFormat: 'comma', parseBooleans: true };

export const buildParams = (params: any) => {
  return queryString.stringify(params, stringifyOpts);
};

export const getParams = (providedLocation = null) => {
  return queryString.parse((providedLocation || location).search, parseOpts);
};

export const setParams = (newParams: any) => {
  const currentParams = getParams();
  const newQuery = buildParams({ ...currentParams, ...newParams });

  if (newQuery) {
    Router.push(`${location.pathname}?${newQuery}`);
  } else {
    Router.push(location.pathname);
  }
};
