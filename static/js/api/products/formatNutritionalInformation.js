import isEmpty from 'lodash/fp/isEmpty';

const measurementUnits = {
  GRM: 'g',
  KJO: 'kJ',
  E14: 'kcal',
  MC: 'mcg',
  MGM: 'mg'
};

function getFormattedQuantity(quantity) {
  return quantity.map(({ _: amount, measurementUnitCode, name: { en: measurementName } }) => {
    const symbol = measurementUnits[measurementUnitCode];

    if (symbol) {
      return `${amount}${symbol}`;
    }

    return `${amount} ${measurementName}`;
  });
}

function extractNutrient(nutrientDetail) {
  const { nutrientTypeName, quantityContained } = nutrientDetail;
  return {
    name: nutrientTypeName.en,
    quantity: getFormattedQuantity(quantityContained)
  };
}

function formatNutritionalInformation(rawApiResponse) {
  if (!isEmpty(rawApiResponse)) {
    const nutritionalInfo = rawApiResponse.map(size => {
      const { nutrientDetails, servingSizeDescription } = size;
      return {
        nutrients: nutrientDetails.map(n => extractNutrient(n)),
        servingSize: servingSizeDescription.en
      };
    });

    return nutritionalInfo;
  }
  return [];
}

export default formatNutritionalInformation;
