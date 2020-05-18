import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/fp/isEmpty';
import categoryProps from '../propTypes/category';
import Signpost from '../Signpost';
import './CategoryList.scss';

const CategoryList = ({ categories }) =>
  isEmpty(categories) ? null : (
    <div className="category-list">
      {categories.map(c => (
        <div className="category-list--item" key={c.id}>
          <Signpost to={`/category/${c.id}`} label={c.name} />
        </div>
      ))}
    </div>
  );

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(categoryProps)).isRequired
};

export default CategoryList;
