import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import InfiniteScroll from 'react-infinite-scroll-component';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
import LazyLoad from 'react-lazyload';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from './edit';
import ReportIcon from '@mui/icons-material/Report';
import { Link, BrowserRouter  } from "react-router-dom";
import Gifen from './awd';
import Ban from './ban';
import { useNavigate } from 'react-router-dom';

function Category(){
const Navigate = useNavigate();
const [page, setPage] = useState(0)
const [selectedCategory, setSelectedCategory] = useState('Cat0');;
const [hasMore, setHasMore] = useState(true);
const { category } = useParams();
const [previousCategory, setPreviousCategory] = useState(null);
const [categoryResults, setCategoryResults] = useState([]);
const [categoryResultsIds, setCategoryResultsIds] = useState([]);
const [prevtag, setprevtag] = useState(null);
const [Sort, SetSort] = useState('addDate desc')
const [prevsort, setprevsort] = useState(null);
const url2=`${window.API_URL}/search/category/${category}?page=${page}&sort=${Sort}`;
const handleCategorySelect = () => {
  const headers = {
    'Content-Type': 'application/json'
  };

  const jwtToken = localStorage.getItem('jwtToken');
  if (jwtToken) {
    headers['Authorization'] = `Bearer ${jwtToken}`;
  } else {
    localStorage.removeItem('jwtToken');
  }

  fetch(url2, {
    method: 'GET',
    headers: headers
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('Dane z serwera:', data);
      if (Array.isArray(data.content) && data.content.length > 0) {
        const newResults = data.content.filter(gif => !categoryResultsIds.includes(gif.id_gif)); // filter out duplicates
        setCategoryResults(prevResults => [...prevResults, ...newResults]);
        setCategoryResultsIds(prevIds => [...prevIds, ...newResults.map(gif => gif.id_gif)]);
       
      } else {
        setHasMore(false); // Jeśli brak nowych wyników, ustaw hasMore na false
      }
    })
    .catch(error => console.error(error));
};

useEffect(() => {
 
    handleCategorySelect();
  
}, [Sort, page]);
const loadMoreGifs = () => {
  setPage(page=>page+1);
  handleCategorySelect();
};
const handleSort = (event) => {
    const Sort = event.target.value;
    SetSort(Sort);
    
    if (Sort != "sor") {
      if (Sort != prevsort) {
        setCategoryResults([]);
        setCategoryResultsIds([]);
        setPage(0);
        setprevsort(Sort);
      }
      setPage(0);
      if(category != 'Cat0') {
        handleCategorySelect();
    } else {
      setCategoryResults([]);
      setCategoryResultsIds([]);
      setPage(0);
      setprevsort(null);}
    }
  };
  
    
  const handleLike = async (id) => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        // Handle the case when the JWT token is not available
        console.log('JWT token not found');
        toast.error('Musisz być zalogowany aby dać like', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
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
      setCategoryResults((prevGifs) => {
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
        // Handle the case when the JWT token is not available
        toast.error('Musisz być zalogowany aby dać dislike', {
  
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
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
      setCategoryResults((prevGifs) => {
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
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
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
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
  
        console.log('Gif został usunięty');
        window.location.reload(); // Odśwież stronę
        // Tutaj możesz wykonać dodatkowe działania, takie jak odświeżenie listy gifów itp.
      } else {
        toast.warn('Wystąpił problem podczas usuwania gifa', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
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
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
  
        console.log('Reported');
        
        // Tutaj możesz wykonać dodatkowe działania, takie jak odświeżenie listy gifów itp.
      } else {
        toast.warn('Zgłosiłeś już ten gif', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
        console.log('Wystąpił problem podczas zgłoszania gifa');
      }
      
    } catch (error) {
      console.log('An error occurred while removing a like:', error);
    }
  };
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category != "Cat0") {

      if (category != previousCategory) {
        setCategoryResults([]);
        setCategoryResultsIds([]);
        setPage(0);
        setPreviousCategory(category);
        handleCategorySelect(category);
      }
      handleCategorySelect(category);
    } else {
      setPage(0);
      setPreviousCategory(null);
    }
    Navigate(`/category/${category}`);
  };
  const jwtToken = localStorage.getItem('jwtToken');
  const user_id = localStorage.getItem('user_id');
  const user_role = localStorage.getItem('user_role');
return(
    <div>
    <div className='dropdown'>
        
        <select value={selectedCategory} onChange={handleCategoryChange}> 
          <option value="Cat0">Kategorie</option>
          <option value="Cat1">Cat1</option>
          <option value="Cat2">Cat2</option>
          <option value="Cat3">Cat3</option>
        </select>
        
      </div>
        
        <div className='dropdown'>
     
        <select value={Sort} onChange={handleSort}> 
        <option value="addDate desc">Od najnowszych</option>
          <option value="addDate asc">Od najstarszych</option>
          <option value="title asc">Alfabetycznie a-z</option>
          <option value="title desc">Alfabetycznie z-a</option>
          
        </select>
       
      </div>
          <InfiniteScroll
      dataLength={categoryResults.length}
      next={loadMoreGifs}
      hasMore={hasMore}
      scrollThreshold={0.9}
    >
      <div className='galleryy'>
  {categoryResults.map((gif, index) => (
            <li key={`gif-${index}`}>
        <Link to={`/podstrona/${gif.id_gif}`}>
          <img
            src={`${window.API_URL}${gif.reflink}`}
            alt={gif.title}
            style={{ width: '200px', height: '200px' }}
          />
        </Link>
      
      <div className='button-container'>
        {(user_role === 'Admin' || user_id === gif.creator.id_user) && jwtToken && (
          <IconButton onClick={() => handleDelete(gif.id_gif)}>
            <DeleteIcon />
          </IconButton>
        )}

        {user_id === gif.creator.id_user && jwtToken && <Edit gif={gif} id={gif.id_gif} />}

        {user_role !== 'Admin' && user_id !== gif.creator.id_user && jwtToken && (
          <IconButton onClick={() => handleReport(gif.id_gif)}>
            <ReportIcon />
          </IconButton>
        )}

        {gif.likedByCurrentUser === false ? (
          <IconButton onClick={() => handleLike(gif.id_gif)}>
            <ToastContainer
              position='top-right'
              autoClose={1}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
            <ThumbUpAltOutlinedIcon />
            <span style={{ color: 'white' }}>{gif.likeCount} </span>
          </IconButton>
        ) : (
          <IconButton onClick={() => handleDislike(gif.id_gif)}>
            <ToastContainer
              position='top-right'
              autoClose={1}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
            <ThumbUpIcon />
            <span style={{ color: 'white' }}>{gif.likeCount} </span>
          </IconButton>
        )}

        {user_role === 'Admin' && jwtToken && (
          <IconButton>
            <Ban id={gif.id_gif} />
          </IconButton>
        )}
      </div>
    </li>
    
  
  ))
  }
 
</div>
</InfiniteScroll>
</div>
);}
export default Category;