import React from 'react';
import PropTypes from 'prop-types';
import ScrollLock from 'react-scrolllock';
import { Link } from 'react-router-dom';
import { ReactComponent as NavIconDown } from '../../../../assets/icons/chevron-small-down.svg';
import { ReactComponent as NavIconUp } from '../../../../assets/icons/chevron-small-up.svg';
import { ReactComponent as NavIconRight } from '../../../../assets/icons/chevron-small-right.svg';
import './Menu.scss';

const Menu = ({ categories, toggleMenu, openCategory, selectedCategory }) => (
  <div className="app-menu--container">
    <button
      className="app-menu__close"
      aria-label="Close menu"
      type="button"
      onClick={toggleMenu}
      onKeyPress={toggleMenu}
    />
    <ScrollLock>
      <nav className="container app-menu" data-testid="category-menu" id="app-menu-nav">
        {categories.map(c => (
          <div
            className="app-menu--item"
            key={`container-${c.id}`}
            aria-expanded={selectedCategory === c.id}
          >
            <button
              key={`button-${c.id}`}
              className="app-menu--link"
              onClick={() => openCategory(c.id)}
              type="button"
              aria-haspopup="true"
              aria-pressed="true"
            >
              <span key={`span-${c.id}`} className="app-menu--link-label">
                {c.name}
              </span>
              {selectedCategory === c.id ? (
                <NavIconUp key={`svg-${c.id}`} className="app-menu--link-icon" />
              ) : (
                <NavIconDown key={`svg-${c.id}`} className="app-menu--link-icon" />
              )}
            </button>
            {selectedCategory === c.id ? (
              <div
                className="app-menu--subcategories"
                onClick={toggleMenu}
                onKeyPress={toggleMenu}
                role="presentation"
              >
                {c.subcategories.map(subcategory => (
                  <div className="app-menu--item" key={subcategory.id}>
                    <Link to={`/category/${subcategory.id}`} className="app-menu--link">
                      <span className="app-menu--link-label">{subcategory.name}</span>
                      <NavIconRight className="app-menu--link-icon" />
                    </Link>
                  </div>
                ))}
                <div className="app-menu--item">
                  <Link to={`/category/${c.id}`} className="app-menu--link">
                    <span className="app-menu--link-label">View all</span>
                    <NavIconRight className="app-menu--link-icon" />
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </nav>
    </ScrollLock>
  </div>
);

Menu.propTypes = {
  categories: PropTypes.instanceOf(Object).isRequired,
  toggleMenu: PropTypes.func.isRequired,
  openCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired
};

export default Menu;
