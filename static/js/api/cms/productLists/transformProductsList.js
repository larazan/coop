import { find, flow, get, getOr, map, orderBy } from 'lodash/fp';

export const transformProductsListByType = (type, res) => {
  const items = flow(
    orderBy(['sys.updatedAt'], ['desc']),
    find(item => item.fields.type === type),
    getOr([], 'fields.products'),
    map(item => {
      const id = get('sys.id', item);
      return find(product => product.sys.id === id, res.includes.Entry).fields.gtin;
    })
  )(res.items);

  return {
    // nb. this is 'type' in the cms to denote the type of list (basket / etc)
    name: type,
    items
  };
};

export const transformProductsListById = (id, res) => {
  const list = res.items[0];
  const items =
    list?.fields?.products.map(product => {
      const ident = product.sys.id;
      return find(entry => entry.sys.id === ident, res.includes.Entry)?.fields.gtin;
    }) || [];

  return list
    ? {
        title: list.fields.title,
        items
      }
    : undefined;
};
