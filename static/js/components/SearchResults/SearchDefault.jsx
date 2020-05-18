import React from 'react';

const SearchDefault = () => (
  <div className="search-results search-results--default">
    <div className="container">
      <header className="page--header">
        <h2 className="page--title">Search for products</h2>
      </header>
      <p>You can use the search input in the header to find products by:</p>
      <ul>
        <li>category, for example ‘free from’</li>
        <li>generic product type, for example ‘bread’</li>
        <li>
          specific products, for example ‘Co-op whole bean Italian style Fairtrade coffee beans
        </li>
      </ul>
    </div>
  </div>
);

export default SearchDefault;
