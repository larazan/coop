import { map } from 'lodash/fp';

function extractParentCategoryIds(productDetails) {
  return map(p => p.extId, productDetails.parentCategories).reverse();
}

export default extractParentCategoryIds;
