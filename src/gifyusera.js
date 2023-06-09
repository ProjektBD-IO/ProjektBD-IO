import React, { useEffect, useState } from 'react';

const UserGifs = () => {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const fetchUserGifs = async () => {
    const token = localStorage.getItem('jwtToken');
      try {
        const response = await fetch(`${window.API_URL}/api/gif/usergifs`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setGifs(data);
      } catch (error) {
        console.error('Error fetching user gifs:', error);
      }
    };

    fetchUserGifs();
  }, []);

  return (
    <div>
      <h1>User Gifs</h1>
      {gifs.map((gif) => (
          <li key={gif.id_gif} >
        <img
        src={`${window.API_URL}${gif.reflink}`}
        alt={gif.title}
        style={{ width: '200px', height: '200px' }}
        />
      </li>
      ))}
    </div>
  );
};

export default UserGifs;