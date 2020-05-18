import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/remove.svg';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/search.svg';
import FocusManager from '../../../FocusManager';
import Spinner from '../../../Loading/Spinner';
import Errors from './Errors';
import Results from './Results';
import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isResultsListOpen: false
    };

    this.onTermChange = this.onTermChange.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
  }

  onTermChange(evt) {
    const { value } = evt.target;
    const { searchAction, clearSearch } = this.props;

    if (value === '') {
      clearSearch();
    }

    if (value !== '') {
      searchAction(value);
    }
  }

  onSubmitQuery(evt) {
    const { searchTerm, history } = this.props;

    evt.preventDefault();

    history.push({
      pathname: '/search',
      search: `?term=${encodeURI(searchTerm)}`
    });

    this.setState({ isResultsListOpen: false });
  }

  render() {
    const {
      searchTerm,
      products,
      categories,
      relatedTerms,
      isFetching,
      errors,
      clearSearch
    } = this.props;

    const { isResultsListOpen } = this.state;

    return (
      <FocusManager
        onFocus={() => this.setState({ isResultsListOpen: true })}
        onBlur={() => this.setState({ isResultsListOpen: false })}
      >
        {boundFocusManagerProps => (
          <>
            <div className="app-search--box-wrapper">
              <form className="app-search--box" onSubmit={this.onSubmitQuery}>
                <div className="app-search--box--input">
                  <input
                    className="form-input"
                    type="search"
                    name="search"
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect="off"
                    placeholder="Search for groceries"
                    data-testid="search-input"
                    value={searchTerm}
                    onChange={this.onTermChange}
                    {...boundFocusManagerProps}
                  />
                  {searchTerm !== '' ? (
                    <button
                      className="app-search--box--clear"
                      type="reset"
                      onClick={clearSearch}
                      data-testid="search-reset"
                    >
                      <CloseIcon width="21" height="21" />
                    </button>
                  ) : null}
                </div>
                <button
                  className="app-search--box--submit"
                  type="submit"
                  data-testid="search-submit"
                >
                  {isFetching ? (
                    <Spinner width="24" height="24" />
                  ) : (
                    <SearchIcon width="32" height="32" />
                  )}
                </button>
              </form>
            </div>
            {isResultsListOpen && (
              <Results
                searchTerm={searchTerm}
                products={products}
                categories={categories}
                relatedTerms={relatedTerms}
                isFetching={isFetching}
                closeSuggestions={() => this.setState({ isResultsListOpen: false })}
                {...boundFocusManagerProps}
              />
            )}
            <Errors errors={errors} />
          </>
        )}
      </FocusManager>
    );
  }
}

Search.propTypes = {
  searchAction: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  categories: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  relatedTerms: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool.isRequired,
  history: PropTypes.instanceOf(Object)
};

Search.defaultProps = {
  searchTerm: '',
  products: [],
  categories: [],
  relatedTerms: [],
  errors: [],
  history: {}
};

export default Search;
