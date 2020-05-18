import { get as getAddressParts } from './address/addressParts/get';
import { get as getCoordinates } from './address/coordinates/get';
import { get as getPlacesNearby } from './address/placesNearby/get';
import { get as getPostcode } from './address/postcode/get';
import { evaluate, evaluateApplyVoucher, evaluateRemoveVoucher } from './basket/evaluate/post';
import { get as getCategories } from './category/get';
import { get as getByCategoryId } from './cms/banner/getByCategoryId';
import { get as getByPage } from './cms/banner/getByPage';
import { get as getBannerBySearchTerm } from './cms/banner/getBySearchTerm';
import { get as getListByType } from './cms/productsLists/getListByType';
import { get as getRelatedProducts } from './cms/relatedProducts/get';
import { get as getCampaignByUri } from './cms/campaign/getByUri';
import { post as createOrder } from './order/post';
import { patch as finalizeOrder } from './payment/finalize/patch';
import { checkAvailability } from './products/availability/post';
import { get as getById } from './products/details/get';
import { get as range } from './products/range/get';
import { getByCategory } from './products/search/byCategory';
import { getByGtin } from './products/search/byGtin';
import { getBySearchTerm } from './products/search/bySearchTerm';
import { get as searchPrediction } from './search/prediction/get';
import { get as getSlots } from './slots/get';
import { get as getStoreDetails } from './stores/get';

export const apis = {
  address: {
    getParts: async ({ link }) => {
      const res = await getAddressParts(link);
      return res;
    }
  },
  addressesList: async ({ q }) => {
    const res = await getPostcode(q);
    return res;
  },
  addressesCoordinatesRead: async ({ postcode }) => {
    const res = await getCoordinates(postcode);
    return res;
  },
  addressesPlacesNearbyRead: async ({ coordinates }) => {
    const res = await getPlacesNearby(coordinates);
    return res;
  },
  basket: {
    evaluate,
    evaluateApplyVoucher,
    evaluateRemoveVoucher
  },
  categoriesList: async storeId => {
    const res = await getCategories(storeId);
    return res;
  },
  cms: {
    banners: {
      getByCategoryId,
      getByPage,
      getBannerBySearchTerm
    },
    relatedProducts: {
      getRelatedProducts
    },
    productsLists: {
      getListByType
    },
    getCampaign: async ({ uri }) => {
      const res = await getCampaignByUri({ uri });
      return res;
    }
  },
  slot: {
    getSlots: async coordinates => {
      const res = await getSlots(coordinates);
      return res;
    }
  },
  products: {
    checkAvailability,
    getByCategory,
    getByGtin,
    getById,
    getBySearchTerm,
    range
  },
  ordersCreate: async ({ order }) => {
    const res = await createOrder({ order });
    return res;
  },
  payment: {
    finalizeOrder
  },
  searchList: async params => {
    const res = await searchPrediction(params);
    return res;
  },
  stores: {
    get: async ({ storeId }) => {
      const res = await getStoreDetails({ storeId });
      return res;
    }
  }
};
