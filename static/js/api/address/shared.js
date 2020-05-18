export const encodePostcode = postcode => encodeURIComponent(postcode.toLowerCase());

export const extractAddressParts = elements => {
  const elementsMap = {
    1: 'name',
    2: 'apartment',
    3: 'building_name',
    4: 'building',
    5: 'building_group',
    6: 'street',
    7: 'locality',
    8: 'village',
    9: 'town',
    10: 'post_town',
    11: 'city',
    13: 'county'
  };

  const parts = elements
    .map(element => ({
      name: elementsMap[element.type.code],
      value: element.value
    }))
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr.name]: curr.value
      };
    }, {});

  return parts;
};
