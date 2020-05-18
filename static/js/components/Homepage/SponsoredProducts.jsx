import React from 'react';
import { useSelector } from 'react-redux';
import { useProductsByGtins } from '../../hooks/useProducts';
import { productsMatchingGtins } from '../../store/products/selectors';
import ProductGroup from '../ProductGroup';

const getGtins = () => {
  return [
    '5449000000439', //    	Coca Cola # 1.5LTR
    '5000128729475', //	Co-op IR Chocolate Cake
    '7613036077514', //	Nescafe Gold Blend Coffee 200G
    '8711327373105', //	Ben and Jerrys Cookie Dough 465ml
    '5000127533196', //	Kelloggs Variety Pack 8S
    '5000128922296', //	Co-op Strawberries Punnet
    '7613036243452', //	Nestle Milkybar Buttons Giant Bag 103G
    '5000295142893', //	CATH CITY MAT CHED
    '8410302106300', //	Campo Viejo Rioja 75CL
    '5019503002157', //	Frozen Quorn Mince
    '5000328376165', //	Walkers Variety Crisps # 6x25G
    '5000128644013', //	GRO Sizzlin Sausages
    '5012035950040', //	HARIBO STARMIX 180G
    '5000128969314', //	Co-op Hot & Spicy Chicken Wings
    '5000184321064' //	Hellmanns Real Mayonnaise 400G
  ];
};

const SponsoredProducts = () => {
  const gtins = getGtins();

  const products = useSelector(productsMatchingGtins(gtins));

  useProductsByGtins(gtins);

  return <ProductGroup theme="linen" title="Sponsored products" products={products} />;
};

export default SponsoredProducts;
