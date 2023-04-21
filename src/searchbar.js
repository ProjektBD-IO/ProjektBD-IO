import React, { useState, useEffect } from 'react';
function SearchResults() {
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:8889/search/tags/2')
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.log(error));
    }, []);
  
    return (
      <div className='gallery'>
          <ul>
              {searchResults.map(gif => (
                  <li key={gif.id_gif}>
                      <img src= {`http://localhost:8889${gif.reflink}`} alt={gif.title} style={{ width: "100%", margin:"0px" }} padding="0px"/>
                  </li>
              ))}
          </ul>
      </div>
    );
  }
  
function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8889/search?tags=${searchValue.split(' ').join(',')}`)
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.log(error));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Wyszukaj..."  value={searchValue} onChange={handleChange} />
        <button type="submit">Szukaj</button>
      </form>
    </div>
  );
}

export default SearchBar;
