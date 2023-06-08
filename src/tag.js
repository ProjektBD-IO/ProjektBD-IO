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
import { useNavigate } from 'react-router';

function Tag(){
const [hasMore, setHasMore] = useState(true);
const [searchResults, setSearchResults] = useState([]);
const [page, setPage] = useState(0);
const [searchResultsIds, setSearchResultsIds] = useState([]);
const [Sort, SetSort] = useState('addDate desc')
const [prevsort, setprevsort] = useState(null);
const [prevtag, setprevtag] = useState(null);
const { search } = useParams();
const [searchTerm, setSearchTerm] = useState('');
const Navigate = useNavigate();
const handleSearch = () => {
    
    const url = `${window.API_URL}/search/tag/${search}?page=${page}&sort=${Sort}`;
    const headers = {
      'Content-Type': 'application/json'
    };

    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;}
      else {
        localStorage.removeItem('jwtToken');
      }

    fetch(url, {
      method: 'GET',
      headers: headers
    })
      .then((response) => {
        
          return response.json();
        })
      .then((data) => {
        console.log('Dane z serwera:', data);
        const newResults = data.content.filter(gif => !searchResultsIds.includes(gif.id_gif)); // filter out duplicates
        setSearchResults(prevResults => [...prevResults, ...newResults]);
        setSearchResultsIds(prevIds => [...prevIds, ...newResults.map(gif => gif.id_gif)]); // add new IDs to the array
        setPage(page=>page+1);
        setHasMore(newResults.length>0); 
      })
      .catch(error => console.error(error));
  ;}
  useEffect(() => {
    handleSearch();
  }, [Sort, page]);
  const handleSort = (event) => {
    const Sort = event.target.value;
    SetSort(Sort);
    
    if (Sort != "sor") {
      if (Sort != prevsort) {
        setSearchResults([]);
        setSearchResultsIds([]);
        setPage(0);
        setprevsort(Sort);
      }
      setPage(0);
      if (search != '') { 
        handleSearch();
     
      
    } else {
      setSearchResults([]);
      setSearchResultsIds([])
      setPage(0);
      setprevsort(null);
    }
  };
}

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
  
      setSearchResults((prevGifs) => {
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
  
      setSearchResults((prevGifs) => {
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
  const handleTagChange = () => {
    
    if (searchTerm != "") {
      if (searchTerm != prevtag) {
        setSearchResults([]);
        setSearchResultsIds([]);
        setPage(0);
        Navigate(`/search/${searchTerm}`);
        setprevtag(searchTerm);
        handleSearch(searchTerm); // dodaj argument searchTerm
      }
     
      setPage(0);
    } 

  };
  const jwtToken = localStorage.getItem('jwtToken');
  const user_id = localStorage.getItem('user_id');
  const user_role = localStorage.getItem('user_role');
  return (
    
    <>
    <div className='search-bar'>
    <input type='text' placeholder='Wyszukaj...' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      <button type='submit' onClick={handleTagChange} >Search</button>
     
        
      <InfiniteScroll
      dataLength={searchResults.length+1}
      next={handleSearch}
      hasMore={hasMore}
      
      scrollThreshold={200}
    >
        
        <div className='dropdown'>
     
        <select value={Sort} onChange={handleSort}> 
        <option value="addDate desc">Od najnowszych</option>
          <option value="addDate asc">Od najstarszych</option>
          <option value="title asc">Alfabetycznie a-z</option>
          <option value="title desc">Alfabetycznie z-a</option>
          
        </select>
       
      </div>
      </InfiniteScroll>
      </div>
      <div className='galleryy'>
        
    {searchResults.map(gif => (
    <li key={gif.id_gif}>
      <LazyLoad> 
      {user_id === gif.creator.id_user && jwtToken ? (
        <div style={{ border: '2px purple', display: 'inline-block' }}>
          <Link to={`/podstrona/${gif.id_gif}`}>
            <img
              src={`${window.API_URL}${gif.reflink}`}
              alt={gif.title}
              style={{ width: '200px', height: '200px' }}
              onClick={<Gifen id={gif.id_gif} />}
            />
          </Link>
        </div>
      ) : (
        <Link to={`/podstrona/${gif.id_gif}`}>
          <img
            src={`${window.API_URL}${gif.reflink}`}
            alt={gif.title}
            style={{ width: '200px', height: '200px' }}
          />
        </Link>
      )}
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
      </LazyLoad>
    </li>
  ))}
</div>

</>
);}
export default Tag;

