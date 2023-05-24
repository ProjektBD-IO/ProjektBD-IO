import React, { useEffect, useState, useRef } from 'react';
import LazyLoad from 'react-lazyload';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function Gif({ classes }) {
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(0);
  const sendRequestRef = useRef(true);
  const [Sort, SetSort] = useState('addDate desc')
  const loadGifs = () => {
    if (sendRequestRef.current) {
      sendRequestRef.current = false;
      fetch(`${window.API_URL}/?page=${page}&sort=${Sort}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Dane z serwera:', data);
          setGifs([...gifs, ...data.content]);
          setPage((page) => page + 1);
          sendRequestRef.current = true;
          return Promise.resolve(true);
        })
        .catch((error) => {
          console.error('Błąd podczas pobierania danych z serwera:', error);
          sendRequestRef.current = true;
          return Promise.resolve(false);
        });
    } else {
      return Promise.resolve(false);
    }
  };

  useEffect(() => {
    loadGifs();
  }, []);
 

  const handleLike = async (id) => {
    const token = localStorage.getItem('jwtToken');
    const url = `${window.API_URL}/api/like?id_gif=${id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_gif: id }),
    });
    const data = await response.json();
    console.log(data);
    
  };
  const handleDislike = async (id) => {
    const token = localStorage.getItem('jwtToken');
    const url = `${window.API_URL}/api/dislike?id_gif=${id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_gif: id }),
    });
    const data = await response.json();
    console.log(data);
    
  };
  
 
  return (
    <InfiniteScroll
      dataLength={gifs.length}
      hasMore={true}
      onScroll={loadGifs}
      loader={<h4>Loading...</h4>}
      scrollThreshold={200}
    >
      
      <div className='galleryy'>
        {gifs.map((gif) => (
          <li key={gif.id_gif} >
            <LazyLoad >  
              <img
                src={`${window.API_URL}${gif.reflink}`}
                alt={gif.title}
                style={{width: '200px', height: '200px'}}
                
              />
             <IconButton onClick={() => handleLike(gif.id_gif)}>
        {gif.likedByCurrentUser ? (
          <>
            <ThumbDownIcon />
            <span style={{ color: 'white' }}>{gif.likeCount}</span>
          </>
        ) : (
          <>
            <ThumbUpIcon />
            <span style={{ color: 'white' }}>{gif.likeCount}</span>
          </>
        )}
      </IconButton>
      <IconButton onClick={() => handleDislike(gif.id_gif)}>
        <ThumbDownIcon />
      </IconButton>
            </LazyLoad>
          </li>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default Gif;