import React, { useState } from 'react';
import SearchForm from './tagi1';
import DropdownButton from './kategorie';
function Gif1({ setSearchResults }) {
    const handleSearch = (searchTerm) => {
      fetch(`http://localhost:8889/search/tag/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data))
        .catch((error) => console.error(error));
    };
  
    const handleCategorySelect = (selectedCategory) => {
      fetch(`http://localhost:8889/search/category/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data))
        .catch((error) => console.error(error));
    };
  
    return (
      <div>
        <SearchForm onSubmit={handleSearch} />
        <div className="dropdown">
          <DropdownButton
            categories={["Cat1", "Cat2", "Cat3"]}
            onChange={handleCategorySelect}
          />
        </div>
        <div className="search-results"></div>
      </div>
    );
  }
export default Gif1;
  