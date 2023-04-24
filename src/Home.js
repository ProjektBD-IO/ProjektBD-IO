import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
function Gif() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
      fetch(`http://localhost:8889/`)
          .then(response => response.json())
          .then(data => {
              console.log('Dane z serwera:', data);
              setGifs(data);
          })
          .catch(error => console.error('Błąd podczas pobierania danych z serwera:', error));
  }, []);
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
    <div className='gallery'>
        <ul>
            {gifs.map(gif => (
                <li key={gif.id_gif}>
                    <img src= {`http://localhost:8889${gif.reflink}`} alt={gif.title} style={{ width: "100%", margin:"0px" }} padding="0px"/>
                    <IconButton onClick={() => handleLike(gif.id_gif)}>
              <ThumbUpIcon />
              <span style={{ color:'white'}}>{gif.likeCount}</span>
                </IconButton>
                    
                </li>
            ))}
        </ul>
    </div>
);
};  
export default Gif;