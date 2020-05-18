import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, map } from 'lodash/fp';
import { nutrient, nutritionalInformation, defaultProps } from '../propTypes/nutrient';

const hasNutrients = nutritionInfo => {
  return !isEmpty(nutritionInfo) && !isEmpty(nutritionInfo.nutrients);
};

const Nutrient = ({ name, quantity }) => (
  <>
    <dt className="infoblock-table--term">{name}</dt>
    <dd className="infoblock-table--definition">{quantity.join(' / ')}</dd>
  </>
);

const NutritionalInformation = ({ nutritionInfo }) => {
  return map(
    nutritionPerServing =>
      hasNutrients(nutritionPerServing) ? (
        <div className="product-view--infoblock" key={nutritionPerServing.servingSize}>
          <h3 className="infoblock-header">{`Nutritional values ${nutritionPerServing.servingSize}`}</h3>
          <dl className="infoblock-table">
            {nutritionPerServing.nutrients.map(({ name, quantity }) => (
              <Nutrient key={name} name={name} quantity={quantity} />
            ))}
          </dl>
        </div>
      ) : null,
    nutritionInfo
  );
};

Nutrient.propTypes = {
  name: nutrient.name.isRequired,
  quantity: nutrient.quantity.isRequired
};

NutritionalInformation.propTypes = {
  nutritionInfo: PropTypes.arrayOf(nutritionalInformation.nutritionInfo).isRequired
};

NutritionalInformation.defaultProps = defaultProps;

export default NutritionalInformation;
