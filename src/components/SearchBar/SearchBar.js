import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ updateInput, input, suggestions }) => {
  const [hidden, setHidden] = useState(false);

  const handleClick = (item) => {
    setHidden(true);
    updateInput(item);
  };

  const handleOnChange = (item) => {
    setHidden(false);
    updateInput(item);
  };

  return (
    <div className='search-bar-container'>
      <input
        className='search-bar'
        key='random1'
        value={input}
        placeholder={'Search for postcode or city'}
        onChange={(e) => handleOnChange(e.target.value)}
      />

      {suggestions && !hidden && (
        <ul className='suggestions'>
          {suggestions.map((item) => {
            return (
              <li
                key={item.postcode}
                className='suggestion-item'
                onClick={() => handleClick(item.postcode)}
              >
                {item.postcode}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
