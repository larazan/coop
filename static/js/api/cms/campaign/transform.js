const transform = data => {
  const item = data?.items[0];

  if (!item) {
    return {};
  }

  const productsList = fields => ({
    element: 'productsList',
    title: fields.heading,
    type: fields.type.split('campaign - ')[1],
    products: fields.products.map(
      product => data.includes.Entry.find(entry => entry.sys.id === product.sys.id).fields.gtin
    )
  });

  const imgById = id => {
    const { fields } = data.includes.Asset.find(asset => asset.sys.id === id);

    return {
      alt: fields.title,
      src: fields.file.url,
      w: fields.file.details.image.width
    };
  };

  const entryById = id => {
    const element = data.includes.Entry.find(entry => entry.sys.id === id);

    if (element.sys.contentType.sys.id === 'productsList') {
      return productsList(element.fields);
    }

    return undefined;
  };

  return {
    title: item.fields.campaignTitle,
    hero: {
      large: imgById(item.fields.heroLarge.sys.id),
      small: imgById(item.fields.heroSmall.sys.id)
    },
    elements: item.fields.pageElements.map(element => entryById(element.sys.id))
  };
};

export default transform;
