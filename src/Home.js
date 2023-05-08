import React, { useEffect, useState, useRef } from 'react';
import LazyLoad from 'react-lazyload';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function Gif({ classes }) {
  const [gifs, setGifs] = useState([]);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(null); 
  const sendRequestRef = useRef(true);
  const [Sort, SetSort] = useState('sort')

  const url=`http://localhost:8889/?page=${page}&sort=${Sort}`;
  const loadGifs = () => {
    if (sendRequestRef.current) {
      sendRequestRef.current = false;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log('Dane z serwera:', data);
          setGifs([...gifs, ...data.content]);
          setMaxPage(data.maxPage);
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
  const hasMore = () => {
    if (maxPage === null) {
      return true; // gdy nie ma danych, ciągle próbujemy ładować
    } else {
      return page <= maxPage; // sprawdzamy, czy aktualna strona jest mniejsza niż maksymalna liczba stron
    }
  };
 

  const handleLike = async (id) => {
    const token = localStorage.getItem('jwtToken');
    const url = `http://localhost:8889/api/like?id_gif=${id}`;
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
    const url = `http://localhost:8889/api/dislike?id_gif=${id}`;
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
      hasMore={hasMore()}
      onScroll={loadGifs}
      loader={<h4>Loading...</h4>}
      scrollThreshold={200}
    >
      
      <div className='galleryy'>
        {gifs.map((gif) => (
          <li key={gif.id_gif} >
            <LazyLoad >  
              <img
                src={`http://localhost:8889${gif.reflink}`}
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