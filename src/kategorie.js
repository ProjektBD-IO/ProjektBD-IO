import React, { useState } from 'react';
import Cat from './kategorie1';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
const categories = ['Cat1', 'Cat2', 'Cat3'];

function DropdownButton(props) {
  const [searchResults, setSearchResults] = useState([]);
  const handleCategorySelect = (data) => {
    setSearchResults(data);
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
      <div className="dropdown-button" > 
      <Cat categories={categories} onChange={handleCategorySelect}/>
      <div className='gallery'>
            {searchResults.map(gif => (
                <li key={gif.id_gif}>
                    <img src= {`http://localhost:8889${gif.reflink}`} alt={gif.title} style={{ width: "100%", margin:"0px" }} padding="0px"/>
                    <IconButton onClick={() => handleLike(gif.id_gif)}>
                <ThumbUpIcon />
              <span style={{ color:'white'}}>{gif.likeCount}</span>
                </IconButton>
                </li>
            ))}
      </div>
    </div>
  );
}

export default DropdownButton;