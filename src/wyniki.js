import React, { useState } from 'react';
function SearchResults() {
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:8889/search?tags=1,2,3')
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.log(error));
    }, []);
  
    return (
      <div className='gallery'>
          <ul>
              {gifs.map(gif => (
                  <li key={gif.id_gif}>
                      <img src= {`http://localhost:8889${gif.reflink}`} alt={gif.title} style={{ width: "100%", margin:"0px" }} padding="0px"/>
                  </li>
              ))}
          </ul>
      </div>
    );
  }
  
  export default SearchResults;