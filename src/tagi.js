import React, { useState } from 'react';
import SearchForm from './tagi1';

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    fetch(`http://localhost:8889/search/tag/${searchTerm}`)
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch}/>
      <div className='galleryy'>
            {searchResults.map(gif => (
                <li key={gif.id_gif}>
                    <img src= {`http://localhost:8889${gif.reflink}`} alt={gif.title} style={{ width: "100%", margin:"0px" }} padding="0px"/>
                </li>
            ))}
        
        
      </div>
    </div>
  );
}

export default SearchResults;