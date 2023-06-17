import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from './edit';
import ReportIcon from '@mui/icons-material/Report';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton, Zoom } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Gifen() {
  const { id } = useParams();
  const [gifs, setGifs] = useState([]);
  const jwtToken = localStorage.getItem('jwtToken');
  const user_id = localStorage.getItem('user_id');
  const user_role = localStorage.getItem('user_role');
  useEffect(() => {
    const fetchData = async () => {

      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const headers = {
          'Content-Type': 'application/json',
          
        };
        if (jwtToken) {
          headers.Authorization = `Bearer ${jwtToken}`;
        }
      
        const response = await fetch(`${window.API_URL}/api/gif/${id}`,{headers: headers});
          
        if (response.ok) {
          const data = await response.json();
          console.log('Dane z serwera:', data);
            setGifs([data]);
          }
        
         else {
          console.error('Błąd podczas pobierania danych z serwera:', response.status);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych z serwera:', error);
      }
    };

    fetchData();
  }, [id]);
  const handleLike = async (id) => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        // Handle the case when the JWT token is not available
        console.log('JWT token not found');
        toast.error('Musisz być zalogowany aby dać like', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
        return;
      }
  
      const url = `${window.API_URL}/api/like?id_gif=${id}`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      };
  
      await fetch(url, {
        method: 'POST',
        headers: headers,
      });
  
      setGifs((prevGifs) => {
        return prevGifs.map((gif) => {
          if (gif.id_gif === id) {
            return {
              ...gif,
              likedByCurrentUser: true,
              likeCount: gif.likeCount + 1,
            };
          }
          return gif;
        });
      });
    } catch (error) {
      console.log('An error occurred while adding a like:', error);
    }
  };
  
  
  const handleDislike = async (id) => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        toast.error('Musisz być zalogowany aby dać dislike', {
          position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
          });
        console.log('JWT token not found');
        return;
      }
  
      const url = `${window.API_URL}/api/dislike?id_gif=${id}`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      };
  
      await fetch(url, {
        method: 'POST',
        headers: headers,
      });
  
      setGifs((prevGifs) => {
        return prevGifs.map((gif) => {
          if (gif.id_gif === id) {
            return {
              ...gif,
              likedByCurrentUser: false,
              likeCount: gif.likeCount - 1,
            };
          }
          return gif;
        });
      });
    } catch (error) {
      console.log('An error occurred while removing a like:', error);
    }
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Czy na pewno chcesz usunąć tego gifa?');
  
    if (!confirmed) {
      // Jeśli użytkownik nie potwierdzi usunięcia, zakończ funkcję
      return;
    }
  
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        toast.error('Musisz być zalogowany aby usunąć gifa', {
          position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
        console.log('JWT token not found');
        return;
      }
      
      const response = await fetch(`${window.API_URL}/api/gif/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
  
      if (response.ok) {
        toast.success('Usunięto', {
          position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
  
        console.log('Gif został usunięty');
        window.location.reload(); // Odśwież stronę
        // Tutaj możesz wykonać dodatkowe działania, takie jak odświeżenie listy gifów itp.
      } else {
        toast.warn('Wystąpił problem podczas usuwania gifa', {
          position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
        console.log('Wystąpił problem podczas usuwania gifa');
      }
    } catch (error) {
      console.log('Wystąpił błąd sieci', error);
    }
  };
  const handleReport = async (id) => {
    const confirmed = window.confirm('Czy na pewno chcesz zgłosić tego gifa?');
  
    if (!confirmed) {
      // Jeśli użytkownik nie potwierdzi usunięcia, zakończ funkcję
      return;
    }
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        console.log('JWT token not found');
        return;
      }
  
      const response = await fetch(`${window.API_URL}/api/report?id_gif=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
  
      if (response.ok) {
        toast.success('Zgłoszono', {
          position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
  
        console.log('Reported');
        
        // Tutaj możesz wykonać dodatkowe działania, takie jak odświeżenie listy gifów itp.
      } else {
        toast.warn('Nie możesz zgłosić gifa dwa razy', {
          position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
        console.log('Wystąpił problem podczas zgłoszania gifa');
      }
      
    } catch (error) {
      console.log('An error occurred while removing a like:', error);
    }
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border:'5px' }}>
      <ul>
        {gifs.map((gif) => (
          <li key={gif.id_gif}>
            {(gif.gifType || (!gif.gifType && user_id == gif.creator.id_user)) && (
              <>
                <h2>Tytuł: {gif.title}</h2>
                <img src={`${window.API_URL}${gif.reflink}`} alt={gif.title} width="500" />
                <p>Tagi: {gif.tags}</p>
                <p>Kategoria: {gif.category.category_name}</p>
                <p>Data dodania: {gif.addDate.substring(0, 10)}</p>
                {(user_role == 'Admin' || user_id == gif.creator.id_user) && jwtToken && (
                  <IconButton onClick={() => handleDelete(gif.id_gif)}>
                    <DeleteIcon />
                  </IconButton>
                )}
                {user_id == gif.creator.id_user && jwtToken && <Edit gif={gif} id={gif.id_gif} />}
                {user_role != 'Admin' && user_id != gif.creator.id_user && jwtToken && (
                  <IconButton onClick={() => handleReport(gif.id_gif)}>
                    <ReportIcon />
                  </IconButton>
                )}
                {gif.likedByCurrentUser==false?
                  <IconButton onClick={() => handleLike(gif.id_gif)}>
                  
                  <ThumbUpAltOutlinedIcon />
                  
                   <span >{gif.likeCount} </span>
                 </IconButton>
                    :
                  <IconButton onClick={() => handleDislike(gif.id_gif)}>
                   
                  <ThumbUpIcon  />
                  <span >{gif.likeCount} </span>
                  </IconButton>
                  
                  }
              </>
            )}
          </li>
        ))}
      </ul>
      <ToastContainer
        transition={Zoom}
        position="top-right"
        limit={1}
        autoClose={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default Gifen;