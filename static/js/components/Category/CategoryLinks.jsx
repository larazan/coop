import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/fp/isEmpty';
import categoryProps from '../propTypes/category';
import Pill from '../Button/Pill';
import LayoutContainer from '../Layout/LayoutContainer';
import './CategoryLinks.scss';

function toggleCategoryLinks(state) {
  return { ...state, isExpanded: !state.isExpanded };
}

class CategoryLinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  render() {
    const { categories, isStandalone, itemsToShow, theme } = this.props;
    const { isExpanded } = this.state;

    const displayCategories = () => {
      if (isStandalone)
        return isExpanded || !itemsToShow ? categories : categories.slice(0, itemsToShow);
      return categories;
    };

    return isEmpty(categories) ? null : (
      <nav className="category-links" data-theme={theme}>
        <LayoutContainer>
          <h3 className="category-links__title">Browse</h3>
          {displayCategories().map(c => (
            <Pill url={`/category/${c.id}`} label={c.name} key={c.id} size="small" />
          ))}
          {isStandalone ? (
            <button
              type="button"
              className="pill pill--small pill--secondary"
              onClick={() => this.setState(toggleCategoryLinks)}
            >
              {isExpanded ? 'Hide' : 'Show all'}
            </button>
          ) : null}
        </LayoutContainer>
      </nav>
    );
  }
}

CategoryLinks.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(categoryProps)),
  isStandalone: PropTypes.bool,
  itemsToShow: PropTypes.number,
  theme: PropTypes.string
};

CategoryLinks.defaultProps = {
  categories: null,
  isStandalone: false,
  itemsToShow: null,
  theme: 'light'
};

export default CategoryLinks;
