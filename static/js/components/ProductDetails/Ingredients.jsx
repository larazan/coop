import { isEmpty } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';

const allergenProps = {
  name: PropTypes.string,
  allergenPositions: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.number,
      startAt: PropTypes.number
    })
  )
};

const insertCommaIfNotLastIngredient = required => (required ? ', ' : '');

const Allergen = ({ allergen: { name, allergenPositions }, index, numberOfIngredients }) => {
  const formatted = [];

  // Bread (Wheat, Barley)
  allergenPositions.forEach(({ startAt, length }, i) => {
    // get the start of the ingredient, up to the allergen: Bread(
    const prevAllergenPosition = allergenPositions[i - 1];
    const prevEndAt = prevAllergenPosition
      ? prevAllergenPosition.startAt + prevAllergenPosition.length
      : 0;
    formatted.push(name.slice(prevEndAt, startAt));

    // the allergen itself: Wheat
    const endAt = startAt + length;
    const allergen = name.slice(startAt, endAt);

    formatted.push(
      <span key={`${allergen + startAt}`} className="product-view--allergen">
        {allergen}
      </span>
    );

    // the end of the ingredient, after the allergen: , Barley)
    const nextAllergenPosition = allergenPositions[i + 1];
    const nextStartAt = nextAllergenPosition ? startAt : name.length;
    formatted.push(name.slice(endAt, nextStartAt));
  });

  // add a comma to this ingredient, if it isn't the last ingredient in the list!
  if (index !== numberOfIngredients - 1) {
    formatted.push(', ');
  }

  return formatted;
};
Allergen.propTypes = PropTypes.shape(allergenProps).isRequired;

const Ingredients = ({ ingredients, subtitle = null }) => {
  return (
    !isEmpty(ingredients) && (
      <div className="product-view--infoblock">
        <h3 className="infoblock-header">Ingredients</h3>
        <div className="infoblock-content">
          {ingredients.map((ingredient, index) => {
            return isEmpty(ingredient.allergenPositions) ? (
              `${ingredient.name}${insertCommaIfNotLastIngredient(
                index !== ingredients.length - 1
              )}`
            ) : (
              <Allergen
                // eslint-disable-next-line react/no-array-index-key
                key={`${index}_${ingredient.name}`}
                allergen={ingredient}
                index={index}
                numberOfIngredients={ingredients.length}
              />
            );
          })}
          {subtitle ? <div className="product-view--subtitle">{subtitle}</div> : null}
        </div>
      </div>
    )
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(allergenProps)).isRequired,
  subtitle: PropTypes.string
};

Ingredients.defaultProps = {
  subtitle: ''
};

export default Ingredients;
