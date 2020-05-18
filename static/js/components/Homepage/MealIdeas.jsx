import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useProductsByGtins } from '../../hooks/useProducts';
import { productsMatchingGtins } from '../../store/products/selectors';
import { ProductListHorizontal } from '../ProductList';

const gtins = {
  list1Gtins: [
    '5000128104524', //	"Co-op 4pint Fresh Semi-skimmed Milk # 2.272LTR"
    '5053827209205', //	Kelloggs Cornflakes 720G
    '5010044000121', //	Warburtons Toastie White Bread # 800G
    '8717163619353', //	Surf Powder Tropical 23 Washes 1.495KG
    '5000128744836', //	Co-op British Chicken Fillets 330g
    '8712100712319', //	PG Tips 80 Pyramid Tea Bags 232G
    '5000128725477', //	Co-op Creamery Butter # 250G
    '5000128583534', //	Co-op Chopped Tomatoes 400G
    '5000128894661', //	Co-op British Mild White Cheddar 240G
    '5010115926404', //	Tate & Lyle Fairtrade Granulated Sugar 1kg
    '5000128943710', //	Co-op Orange Juice Smooth Style # 1LTR
    '5000128932479', //	Co-op Black Sacks # 15S
    '7613036077514', //	Nescafe Gold Blend Coffee 200G
    '5051594002692' //	Aptamil First Milk 1LTR
  ],
  list2Gtins: [
    '5000128746779', //	CP FRZ 79 BEEF QP
    '50457656', //    	Heinz Tomato Ketchup 50% Less Sugar 435G
    '5000128042369', //	Co-op 6 Wholemeal Rolls
    '5000128715140', //	Co-op Sweet Chilli & Honey Chicken Kebabs 341G
    '5000128812238', //	GRO The Incredible Burger 210g
    '5000128653572', //	Co-op Cypriot Halloumi 225g
    '6003770007099', //    	Nandos Medium Marinade 262G
    '5000128929523', //	Co-op Sweet and Crunchy Salad PMP 250G
    '8712566328352', //	Magnum 4 Classic 440ml
    '5449000004451', //    	Coca Cola Diet Coke # 8x330ML
    '5000128966245', //    	Carrot Batons 300g
    '5000128739160', //	Co-op Houmous
    '5010262070074', //    	Pimm's No. 1 Cup 70cl
    '5000128794312', //    	Co-op 2kg Ice Cubes
    '5053990138753', //    	Pringles Sour Cream And Onion 200G
    '5000128710572', //    	Co-op Rainbow Unicones 4x135ml
    '5000128983167', //	Co-op Blueberries
    '8719200086050' //	Elmea Double Cream 284ml
  ],
  list3Gtins: [
    '5000128895545', //	Co-op Fairtrade Irresistible Malbec Argentina 75CL
    '5038862302500', //	INNOCENT STRWBR/BAN SMT 750ml
    '5000289110600', //    	Gordon Gin 70cl
    '5449000133373', //    	Schweppes Tonic Water 1L
    '5021812000656', //    	Bottlegreen Cordial Hand-Picked Elderflower 500ml
    '5000128789936', //    	Co Op Irresistible Special Cuvée Prosecco 75cl
    '7613032807566', //	Buxton Still Natural Mineral Water 8X50CL
    '5000147030156', //    	Robinsons Summer Fruits No Added Sugar Fruit Squash 1LTR
    '5000128430791', //	Co-op Pure Apple Juice 1LTR
    '5000193900861', //    	Schweppes  Lemonade 2LTR
    '5035766062523', //	Birra Moretti Bottle 660ML
    '8002270018213', //	San Pellegrino Sparkling Mineral Water 1LTR
    '5730800925016', //	"Starbucks Fairtrade Frappuccino Coffee Drink Mocha 250ml"
    '8712000050115', //	 Heineken  0.0% Bottles 4x330ML
    '5000128994118' //	"Co-op Orange Juice with Bits 1 Litre"
  ]
};

const MealIdeas = ({ theme }) => {
  const { list1Gtins, list2Gtins, list3Gtins } = gtins;

  const list1 = useSelector(productsMatchingGtins(list1Gtins));
  const list2 = useSelector(productsMatchingGtins(list2Gtins));
  const list3 = useSelector(productsMatchingGtins(list3Gtins));

  useProductsByGtins([...list1Gtins, ...list2Gtins, ...list3Gtins]);

  const groups = [
    {
      title: 'Essentials #stayathome',
      products: list1
    },
    {
      title: 'Get ready for summer',
      products: list2
    },
    {
      title: 'Refresh yourself',
      products: list3
    }
  ];

  return (
    <section data-theme={theme}>
      <div className="product-group">
        <h2 className="product-group--title">Featured Products</h2>

        {groups.map(({ title, products }) => (
          <div key={title}>
            <h3 className="product-group--subtitle">{title}</h3>
            <ProductListHorizontal products={products} />
          </div>
        ))}
      </div>
    </section>
  );
};

MealIdeas.propTypes = {
  theme: PropTypes.string
};

MealIdeas.defaultProps = {
  theme: 'default'
};

export default MealIdeas;
