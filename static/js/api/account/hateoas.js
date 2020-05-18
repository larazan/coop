import { find } from 'lodash/fp';
import store from '../../utils/store';

const oneHour = 60 * 60;

const storageOrFetch = async ({ href, headers, key }) => {
  const item = store.local(`ecom:hateoas:${key}`);
  if (item) {
    return item;
  }

  const res = await fetch(new URL(href), { headers });
  if (res.ok) {
    const json = await res.json();
    store.local(`ecom:hateoas:${key}`, json, oneHour);
    return json;
  }

  throw new Error('hateoas failure');
};

export const query = async ({ href, headers, selector, key = 'root' }) => {
  try {
    const json = await storageOrFetch({ href, headers, key });

    const links = selector.split('.');
    const current = links.shift();

    const found = find(x => x.rel === current, json.links);
    if (found && links.length) {
      const nextSelector = links.join('.');
      const nextKey = `${key}:${current}`;

      return query({
        href: found.href,
        headers,
        selector: nextSelector,
        key: nextKey
      });
    }
    return found || null;
  } catch (error) {
    // console.log(error);
  }
  return null;
};
