import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CoopLogo } from '../../../assets/coop-logo.svg';
import { ReactComponent as NavIconDown } from '../../../assets/icons/chevron-small-down.svg';
import { ReactComponent as NavIconUp } from '../../../assets/icons/chevron-small-up.svg';
import { isAccountEnabled } from '../../../utils/featureFlag';
import ShopInLocation from '../../OrderFulfilment/ShopInLocation';
import { PathnameMessage } from '../../PathnameMessage';
import categoryProps from '../../propTypes/category';
import AccountHeader from './AccountHeader';
import BasketPill from './BasketPill';
import Menu from './Menu';
import SearchBox from './SearchBox';

import './AppHeader.scss';

const noCategory = 'not-an-id';

function toggleMenuOpen(state) {
  const newMenuOpen = !state.menuOpen;
  const selectedCategory = newMenuOpen ? state.selectedCategory : noCategory;

  return { ...state, menuOpen: newMenuOpen, selectedCategory };
}

function toggleCategory(selectedCategory) {
  return state => {
    if (state.selectedCategory === selectedCategory) {
      return { ...state, selectedCategory: noCategory };
    }
    return { ...state, selectedCategory };
  };
}

class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
      selectedCategory: noCategory
    };
  }

  componentDidMount() {
    const {
      menu: { needsCategories }
    } = this.props;

    if (needsCategories) {
      const { loadCategories, storeId } = this.props;
      loadCategories(storeId);
    }
  }

  render() {
    const {
      basketTotal,
      menu: { categories, isFetchingCategories },
      postcode,
      showShoppingInPanel,
      ...otherProps
    } = this.props;

    const { menuOpen, selectedCategory } = this.state;

    return (
      <>
        <header role="banner" className="app-header">
          {isAccountEnabled() ? <AccountHeader /> : null}
          <div className="container app-header--container">
            <Link to="/" className="app-header--link">
              <CoopLogo
                key="coop-logo-svg"
                className="app-header--logo"
                alt="logo"
                data-testid="homepage-link"
              />
            </Link>
            <div className="app-header--menu">
              <button
                type="button"
                className="app-header--menu-link"
                onClick={() => this.setState(toggleMenuOpen)}
              >
                Browse
                {menuOpen ? (
                  <NavIconUp
                    key="nav-icon-up"
                    className="app-header--menu-link-icon"
                    aria-label="Hide menu"
                  />
                ) : (
                  <NavIconDown
                    key="nav-icon-down"
                    className="app-header--menu-link-icon"
                    aria-label="Show menu"
                  />
                )}
              </button>
            </div>
            <BasketPill />
          </div>
          {menuOpen && !isFetchingCategories ? (
            <Menu
              categories={categories}
              selectedCategory={selectedCategory}
              openCategory={id => this.setState(toggleCategory(id))}
              toggleMenu={() => this.setState(toggleMenuOpen)}
            />
          ) : null}
          <div className="container app-search--container">
            <SearchBox history={otherProps.history} {...otherProps.search} />
          </div>
        </header>
        {showShoppingInPanel ? <ShopInLocation postcode={postcode} /> : null}
        {isAccountEnabled() ? <PathnameMessage /> : null}
      </>
    );
  }
}

AppHeader.propTypes = {
  loadCategories: PropTypes.func.isRequired,
  basketTotal: PropTypes.string.isRequired,
  menu: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.shape({ ...categoryProps })),
    needsCategories: PropTypes.bool.isRequired,
    isFetchingCategories: PropTypes.bool.isRequired
  }).isRequired,
  postcode: PropTypes.string,
  showShoppingInPanel: PropTypes.bool.isRequired,
  storeId: PropTypes.string.isRequired
};

AppHeader.defaultProps = {
  postcode: null
};

export default AppHeader;
