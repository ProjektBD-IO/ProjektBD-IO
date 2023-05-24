import React, { useState, useEffect, useRef } from 'react';
import Gif from './Home'
import InfiniteScroll from 'react-infinite-scroll-component';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
import LazyLoad from 'react-lazyload';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from './edit';
function GifPage() {
  const [isDeleted, setisDeleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Cat0');
  const [searchResultsIds, setSearchResultsIds] = useState([]);
  const [previousCategory, setPreviousCategory] = useState(null);
  const [prevtag, setprevtag] = useState(null);
  const [Sort, SetSort] = useState('addDate desc')
  const [prevsort, setprevsort] = useState(null);
  const [gifs, setGifs] = useState([]);
  const [gifsid, setgifsid] = useState([]);
  const sendRequestRef = useRef(true);
  const [hasMore, setHasMore] = useState(true)
 
  const handleSearch = () => {
    if (searchTerm !== '') {
    const url = `${window.API_URL}/search/tag/${searchTerm}?page=${page}&sort=${Sort}`;
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
        if (response.status === 403) {
          // Wyczyść token i przekieruj na stronę logowania
          localStorage.removeItem('jwtToken', '');
          window.location.href = '/login'; // Przekierowanie na stronę logowania
         
        } else {
          return response.json();
        }})
      .then((data) => {
        console.log('Dane z serwera:', data);
        const newResults = data.content.filter(gif => !searchResultsIds.includes(gif.id_gif)); // filter out duplicates
        setSearchResults(prevResults => [...prevResults, ...newResults]);
        setSearchResultsIds(prevIds => [...prevIds, ...newResults.map(gif => gif.id_gif)]); // add new IDs to the array
        setPage(prevPage => prevPage + 1); 
      })
      .catch(error => console.error(error));
  };}
  
  
  useEffect(() => {
    handleSearch();
  }, [page]);
  const handleTagChange = () => {
    if (searchTerm !== '') {
      if (searchTerm !== prevtag) {
        setSearchResults([]);
        setSearchResultsIds([]);
        setPage(0);
        setprevtag(searchTerm);
        handleSearch(searchTerm); // dodaj argument searchTerm
      }
    } else {
      setSearchResults([]);
      setSearchResultsIds([]);
      setPage(0);
      setprevtag(null);
    }
  };
  const url2=`${window.API_URL}/search/category/${selectedCategory}?page=${page}&sort=${Sort}`;
  const handleCategorySelect = () => {
    
    const headers = {
      'Content-Type': 'application/json'
    };

    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;}
      else {
        localStorage.removeItem('jwtToken');
      }

    fetch(url2, {
      method: 'GET',
      headers: headers
    })
      .then((response) => {
        if (response.status === 403) {
          // Wyczyść token i przekieruj na stronę logowania
          localStorage.removeItem('jwtToken', '');
          window.location.href = '/login'; // Przekierowanie na stronę logowania
         
        } else {
          return response.json();
        }})
      .then((data) => {
        console.log('Dane z serwera:', data);
        const newResults = data.content.filter(gif => !searchResultsIds.includes(gif.id_gif)); // filter out duplicates
        setSearchResults(prevResults => [...prevResults, ...newResults]);
        setSearchResultsIds(prevIds => [...prevIds, ...newResults.map(gif => gif.id_gif)]); 
        setPage(page=>page+1)
      })
      .catch(error => console.error(error));
  };

  
  useEffect(() => {
    if (selectedCategory !== "Cat0") {
      handleCategorySelect(selectedCategory, page);
    }
  }, [selectedCategory, page]);
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category !== "Cat0") {
      if (category !== previousCategory) {
        setSearchResults([]);
        setSearchResultsIds([]);
        setPage(0);
        setPreviousCategory(category);
      }
      handleCategorySelect(category);
    } else {
      setSearchResults([]);
      setSearchResultsIds([]);
      setPage(0);
      setPreviousCategory(null);
    }
  };
  const loadGifs = () => {
    const url3 = `${window.API_URL}/?page=${page}&sort=${Sort}`;
    if (sendRequestRef.current) {
      sendRequestRef.current = false;
  
      const headers = {
        'Content-Type': 'application/json'
      };
  
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`;}
        else {
          localStorage.removeItem('jwtToken');
        }
  
      fetch(url3, {
        method: 'GET',
        headers: headers
      })
        .then((response) => {
          if (response.status === 403) {
            // Wyczyść token i przekieruj na stronę logowania
            localStorage.removeItem('jwtToken', '');
            window.location.href = '/login'; // Przekierowanie na stronę logowania
           
          } else {
            return response.json();
          }})
        .then((data) => {
          console.log('Dane z serwera:', data);
          const newResults = data.content.filter(gif => !searchResultsIds.includes(gif.id_gif)); // filter out duplicates
          setGifs(prevResults => [...prevResults, ...newResults]);
          setgifsid(prevIds => [...prevIds, ...newResults.map(gif => gif.id_gif)]); // add new IDs to the array
          setPage((page) => page + 1);
          sendRequestRef.current = true;
  
          if (page >= 10) {
            setHasMore(false);
          }
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
}, [Sort]);
  

const handleSort = (event) => {
  const sort = event.target.value;
  SetSort(sort);
  
  if (sort !== "sor") {
    if (sort !== prevsort) {
      setSearchResults([]);
      setSearchResultsIds([]);
      setGifs([]);
      setgifsid([]);
      setPage(0);
      setprevsort(sort);
      
    }
    handleCategorySelect(selectedCategory);
    if (searchTerm !== '') { 
      handleSearch(searchTerm);
    }
    if(searchTerm=='' & selectedCategory==''){
      loadGifs();
    }
    
  } else {
    setSearchResults([]);
    setSearchResultsIds([]);
    setGifs([]);
    setgifsid([]);
    setPage(0);
    setprevsort(null);
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
      // Handle the case when the JWT token is not available
      toast.error('Musisz być zalogowany aby dać dislike', {
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
const jwtToken = localStorage.getItem('jwtToken');
const user_id = localStorage.getItem('user_id');
const user_role = localStorage.getItem('user_role');

  return (
    
    <div>
      <div className='search-bar'>
      <input type='text' placeholder='Wyszukaj...' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <button type='submit' onClick={handleTagChange} >Search</button>
      <InfiniteScroll
      dataLength={searchResults.length}
      next={handleSearch}
      hasMore={true}
      
      scrollThreshold={0.8}
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
      <div className='dropdown'>
      <InfiniteScroll
      dataLength={searchResults.length}
      next={handleCategorySelect}
      onScroll={handleCategorySelect}
      hasMore={true}
      scrollThreshold={1}
    >
        <select value={selectedCategory} onChange={handleCategoryChange}> 
          <option value="Cat0">Kategorie</option>
          <option value="Cat1">Cat1</option>
          <option value="Cat2">Cat2</option>
          <option value="Cat3">Cat3</option>
        </select>
        </InfiniteScroll>
      </div>
      
      <div className='search-results'>
      
            {searchResults.map(gif => (
              <li key={gif.id_gif}>
                <img src={`${window.API_URL}${gif.reflink}`} alt={gif.title} style={{width: '200px', height: '200px'}}/>
                {(user_role == 'Admin' || user_id == gif.creator.id_user) && jwtToken ? (
          <IconButton onClick={() => handleDelete(gif.id_gif)}> <DeleteIcon  /></IconButton>
        ) : null}
                {gif.likedByCurrentUser==false?
                  <IconButton onClick={() => handleLike(gif.id_gif)}>
                    
                  <ToastContainer
                  position="top-right"
                  autoClose={1}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  />
                  {/* Same as */}
                  <ToastContainer />
                  <ThumbUpAltOutlinedIcon />
                  
                  
                   <span style={{ color: 'white' }}>{gif.likeCount} </span>
                 </IconButton>
                    :
                  <IconButton onClick={() => handleDislike(gif.id_gif)}>
                   <ToastContainer
                  position="top-right"
                  autoClose={1}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  />
                  <ThumbUpIcon  />
                  <span style={{ color: 'white' }}>{gif.likeCount} </span>
                  </IconButton>}
  
          </li>
        ))}
            
          
        
      </div>
      {( searchResults.length === 0) &&    <InfiniteScroll
      dataLength={gifs.length}
      hasMore={true}
      onScroll={loadGifs}
      loader={<h4>Loading...</h4>}
      scrollThreshold={200}
    >
      
      <div className='galleryy'>
        
        {gifs.map((gif) => (
          <li key={gif.id_gif}>
            <LazyLoad>  
             
              <img
                src={`http://localhost:8889${gif.reflink}`}
                alt={gif.title}
                style={{width: '200px', height: '200px'}}
              />  
              
              {(user_role == 'Admin' || user_id == gif.creator.id_user) && jwtToken ? (
                
          <IconButton onClick={() => handleDelete(gif.id_gif)}> <DeleteIcon  /></IconButton>
          
        
        ) : null}
        {user_id == gif.creator.id_user && jwtToken ? (
        <Edit gif={gif} id={gif.id_gif}/>
        ) : null}
                  {gif.likedByCurrentUser==false?
                  <IconButton onClick={() => handleLike(gif.id_gif)}>
                  <ToastContainer
                  position="top-right"
                  autoClose={1}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  />
                  <ThumbUpAltOutlinedIcon />
                  
                   <span style={{ color: 'white' }}>{gif.likeCount} </span>
                 </IconButton>
                    :
                  <IconButton onClick={() => handleDislike(gif.id_gif)}>
                   <ToastContainer
                  position="top-right"
                  autoClose={1}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  />
                  <ThumbUpIcon  />
                  <span style={{ color: 'white' }}>{gif.likeCount} </span>
                  </IconButton>
                  }
  
            </LazyLoad>
          </li>
        ))}
      </div>
    </InfiniteScroll>}
    </div>
    
  );
}

export default GifPage;