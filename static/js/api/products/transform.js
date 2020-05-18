/* eslint-disable camelcase */
import { get, mapValues } from 'lodash/fp';
import { camelCase } from '../../utils/camelCase';
import { extractMaxQuantity } from './extractMaxQuantity';
import extractParentCategoryId from './extractParentCategoryId';
import formatIngredients from './formatIngredients';
import formatNutritionalInformation from './formatNutritionalInformation';
import formatPromo from './formatPromo';

const shared = {
  brand: ['details', 'brand_name'],
  ext_id: 'ext_id',
  gtin: 'gtin',
  id: 'master_product_id',
  current_id: 'id',
  images: ['details', 'media'],
  master_product_id: 'master_product_id',
  promotions: ['details', 'trade_item_marketing_message', 'en'],
  size: ['details', 'net_content', '0', '_'],
  sizeUnit: ['details', 'net_content', '0', 'name', 'en'],
  sku: 'ext_id'
};

const gettersBasic = {
  ...shared,
  description: ['description', 'en'],
  name: ['name', 'en'],
  parent_categories: ['categories'],
  price: ['prices', 'clicks_unit_price']
};

const gettersDetail = {
  ...shared,
  alcohol_by_volume: ['details', 'percentage_of_alcohol_by_volume'],
  allergens: ['details', 'allergen_information', '0', 'allergen_statement', 'en'],
  allergenSubtitle: ['details', 'x_additional_ingredient_statement', 'en'],
  comparison_price_text: ['price', 'comparison_prices', '0', 'comparison_price_text'],
  country: ['details', 'place_of_item_activity_information', 'country_of_origin_statement', 'en'],
  description: ['details', 'trade_item_description', 'en'],
  dietary_info: ['details', 'diet_type_description', 'en'],
  ingredients: ['details', 'food_and_beverage_ingredients'],
  manufacturer: ['details', 'manufacturers_of_trade_item', '0', 'party_address'],
  name: 'name',
  net_weight: ['details', 'net_weight', '_'],
  nutrition_info: ['details', 'nutrient_headers'],
  other_info: ['details', 'additional_information', 'additionalInformation'],
  packaging: ['details', 'packaging', '0', 'packaging_type_name', 'en'],
  parent_categories: ['details', 'presentation_categories'],
  price: ['price', 'clicks_unit_price'],
  restriction: ['details', 'consumer_sales_conditions', '0'],
  safety_info: [
    'details',
    'safety_information',
    '0',
    'precautionary_statements',
    '0',
    'precautionary_statements_description',
    'en'
  ],
  storage_info: ['details', 'consumer_storage_instructions', 'en'],
  usage_info: ['details', 'consumer_usage_instructions', 'en']
};

function transform(product, getters) {
  const nested = mapValues(getter => {
    return get(getter, product);
  }, getters);

  const camelCased = camelCase(nested);
  const { maxQuantity, name } = extractMaxQuantity(camelCased.name);

  return {
    ...camelCased,
    maxQuantity,
    name,
    promotions: formatPromo(camelCased.promotions),
    parentCategories: extractParentCategoryId(camelCased),
    restriction: camelCased.restriction
      ? {
          code: camelCased.restriction.consumerSalesConditionCode,
          defaultMessage: camelCased.restriction.consumerSalesConditionName.en
        }
      : null
  };
}

export function details({ data }) {
  const transformed = transform(data, gettersDetail);
  const ingredients = formatIngredients(transformed.ingredients);

  const productDetails = {
    ...transformed,
    ingredients,
    alcoholByVolume: transformed.alcoholByVolume
      ? `${transformed.alcoholByVolume}%`
      : transformed.alcoholByVolume,
    nutritionInfo: formatNutritionalInformation(transformed.nutritionInfo)
  };

  return productDetails;
}

export function transformPagination(pagination) {
  return camelCase(pagination);
}

export const productsOverview = (valuesFromRequest = {}) => res => {
  const {
    meta: { pagination },
    data: { products }
  } = res;
  const transformedProducts = products.map(product => transform(product, gettersBasic));
  const transformedPagination = transformPagination(pagination);

  return { products: transformedProducts, pagination: transformedPagination, ...valuesFromRequest };
};
