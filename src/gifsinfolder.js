import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
function FolderGifs() {
  const [foldergifs, setfoldergifs] = useState([]);
  const { id } = useParams();
  const { name } = useParams();
  
  useEffect(() => {
    const fetchfolderGifs = async () => {
      const token = localStorage.getItem('jwtToken');
      try {
        const response = await fetch(`${window.API_URL}/api/gifs_in_folder/search/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setfoldergifs(data);
      } catch (error) {
        console.error('Error fetching user gifs:', error);
      }
    };

    fetchfolderGifs();
  }, [id]);

  const deletegif = async (id_gif) => {
    const token = localStorage.getItem('jwtToken');
    const confirmed = window.confirm('Czy na pewno chcesz usunąć tego gifa z folderu?');

    if (!confirmed) {
      return;
    }

    try {
      await fetch(`${window.API_URL}/api/gifs_in_folder/delete?id_folder=${id}&id_gif=${id_gif}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      // Odśwież listę gifów po usunięciu
      const updatedGifs = foldergifs.filter(gif => gif.id_gif !== id_gif);
      setfoldergifs(updatedGifs);
    } catch (error) {
      console.error('Wystąpił błąd podczas usuwania gifa:', error);
    }
  };

  return (
    <div className='gal'>
      <h1>{name}</h1>
      {foldergifs.map((gif) => (
        <div key={gif.id_gif}>
          <img
            src={`${window.API_URL}${gif.reflink}`}
            alt={gif.title}
            style={{ width: '200px', height: '200px' }}
          />
          <IconButton onClick={() => deletegif(gif.id_gif)}>
          <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
}

export default FolderGifs;