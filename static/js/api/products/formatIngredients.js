import { flow, getOr, isEqual, uniqWith, sortBy } from 'lodash/fp';

export default function formatIngredients(ingredients) {
  return ingredients.map(ingredient => {
    return {
      name: getOr(null, ['name', 'en'], ingredient),
      allergenPositions: flow(
        getOr([], ['xNameEmphasis', 'en']),
        uniqWith(isEqual),
        sortBy('startAt')
      )(ingredient)
    };
  });
}
