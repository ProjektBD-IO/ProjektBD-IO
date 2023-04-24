import React, { useState } from 'react';
import SearchForm from './tagi1';
import DropdownButton from './kategorie';
import Gif from './Home'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
function GifPage() {
    const [searchResults, setSearchResults] = useState([]);
    
    const handleSearch = (searchResults) => {
      fetch(`http://localhost:8889/search/tag/${searchResults}`)
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.error(error));
    };
  
    const handleCategorySelect = (searchResults) => {
      fetch(`http://localhost:8889/search/category/${searchResults}`)
        .then(response => response.json())
        .then(data => setSearchResults(data))
        .catch(error => console.error(error));
        
    };
    const handleLike = async (id) => {
      const token = localStorage.getItem('jwtToken');
      const url = `http://localhost:8889/api/like?id_gif=${id}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_gif: id })
      });
      const data = await response.json();
      console.log(data);
    };
  
    return (
      <div>
        <SearchForm onSubmit={handleSearch} />
        <div className='dropdown'>
        <DropdownButton categories={['Cat1', 'Cat2', 'Cat3']} onChange={handleCategorySelect}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          handleCategorySelect={handleCategorySelect} />
        </div>
        <div className='search-results'>
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map(gif => (
                <li key={gif.id_gif}>
                  <img src={`http://localhost:8889${gif.reflink}`} alt={gif.title} style={{ width: "100%", margin:"0px" }}/>
                  <IconButton onClick={() => handleLike(gif.id_gif)}>
              <ThumbUpIcon />
              <span style={{ color:'white'}}>{gif.likeCount}</span>
                </IconButton>
                    
                </li>
              ))}
            </ul>
          )}
        </div>
        {searchResults.length === 0 && <Gif />}
        
      </div>
    );
  }
  
  export default GifPage;