import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';

function Gif() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
      fetch('http://localhost:8889/')
          .then(response => response.json())
          .then(data => {
              console.log('Dane z serwera:', data);
              setGifs(data);
          })
          .catch(error => console.error('Błąd podczas pobierania danych z serwera:', error));
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
};  
export default Gif;