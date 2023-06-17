import React, { useState, useEffect, useRef, useParams } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
import LazyLoad from 'react-lazyload';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Zoom, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from './edit';
import ReportIcon from '@mui/icons-material/Report';
import { Link, BrowserRouter  } from "react-router-dom";
import Gifen from './Podstrona';
import Ban from './ban';
import { useNavigate } from 'react-router-dom';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
function GifPage() {
  const Navigate=useNavigate();

  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Cat0');
  const [searchResultsIds, setSearchResultsIds] = useState([]);
  const [Sort, SetSort] = useState(() => {
    const savedSort = localStorage.getItem('sortValue'); // Sprawdź czy istnieje zapisana wartość sortowania w localStorage lub sessionStorage
    return savedSort ? savedSort : 'addDate desc'; // Jeśli istnieje, ustaw ją jako początkową wartość Sort, w przeciwnym razie ustaw wartość domyślną
  });
  const [prevsort, setprevsort] = useState(null);
  const [gifs, setGifs] = useState([]);
  const [gifsid, setgifsid] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sendRequestRef = useRef(true);

  const handleSort = (event) => {
    const newSort = event.target.value;
    if (newSort !== Sort) {
      SetSort(newSort);
      localStorage.setItem('sortValue', newSort); // Zapisz wartość sortowania w localStorage lub sessionStorage
      setGifs([]);
      setgifsid([]);
      setPage(0);
      loadMoreGifs();
      window.location.reload();
      loadGifs();
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
        headers['Authorization'] = `Bearer ${jwtToken}`;
      } else {
        localStorage.removeItem('jwtToken');
      }
  
      fetch(url3, {
        method: 'GET',
        headers: headers
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log('Dane z serwera:', data);
          if (Array.isArray(data.content) && data.content.length > 0) {
            const newResults = data.content.filter(gif => !searchResultsIds.includes(gif.id_gif)); // filter out duplicates
            const currentGifs = [...gifs];
            const newGifs = [...newResults];
            setGifs([...currentGifs, ...newGifs]);
            setgifsid(prevIds => [...prevIds, ...newResults.map(gif => gif.id_gif)]);
            sendRequestRef.current = true;
            setHasMore(newResults.length>0);
          } else {
            setHasMore(false);
            sendRequestRef.current = true;
          }
          
          return Promise.resolve(true);
        })
        .catch(error => {
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
  }, [Sort, page]);
  
  const loadMoreGifs = () => {
    setPage((prevPage) => prevPage + 1);
  };
  

const [toastDisplayed, setToastDisplayed] = useState(false);
const handleLike = async (id) => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      // Handle the case when the JWT token is not available
      console.log('JWT token not found');
      if (!toastDisplayed) {
        setToastDisplayed(true);
        toast.error('Musisz być zalogowany aby dać like', {
          id: 'like',
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
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
      toast.warn('Zgłosiłeś już ten gif', {
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
const handleTagChange = () => {
  if (searchTerm.trim() === '') {
    return; // Jeśli searchTerm jest pusty, przerwij funkcję
  }
  Navigate(`/search/${searchTerm}`);
};

const handleCategoryChange = (event) => {
  const category = event.target.value;
  localStorage.setItem('selectedCategory', category);
  setSelectedCategory(category);
  Navigate(`/category/${category}`);
};
const jwtToken = localStorage.getItem('jwtToken');
const user_id = localStorage.getItem('user_id');
const user_role = localStorage.getItem('user_role');

  return (
    
    <div>
      
      <div className='search-bar'>
      
  <input type="text" placeholder="Wyszukaj..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="search-input" />
  <button type="submit" onClick={handleTagChange} className="search-button">Szukaj</button>

        
    
        
        <div className='dropdown'>
     
        <select value={Sort} onChange={handleSort} className="sort-select"> 
        <option value="addDate desc">Od najnowszych</option>
          <option value="addDate asc">Od najstarszych</option>
          <option value="title asc">Alfabetycznie a-z</option>
          <option value="title desc">Alfabetycznie z-a</option>
          
        </select>
       
      </div>
       
        </div>
      <div className='dropdown'>
        
        <select value={selectedCategory} onChange={handleCategoryChange} className="category-select"> 
          <option value="Cat0">Kategorie</option>
          <option value="Humor">Humor</option>
      <option value="Sport">Sport</option>
      <option value="Zwierzęta">Zwierzęta</option>
        </select>
        
      </div>
    

      <InfiniteScroll
      dataLength={gifs.length}
      next={loadMoreGifs}
      hasMore={hasMore}
      scrollThreshold={0.9}
      sort={Sort}
    >
      <Masonry columnsCount={4} gutter="15px">
               
        
     
        {gifs.map((gif, index) => (
          <div className="gif-container" key={`gif-${index}`}>
         <>
              
  <Link to={`/podstrona/${gif.id_gif}`}>
    <img
      src={`${window.API_URL}${gif.reflink}`}
      alt={gif.title}
      style={{ width: "100%", margin:"0px" }}
      
    />
    
  </Link>
  
        
        <div className="button-container">
              {(user_role == 'Admin' || user_id == gif.creator.id_user) && jwtToken ? (
                
          <IconButton onClick={() => handleDelete(gif.id_gif)}> <DeleteIcon  /></IconButton>
          
        
        ) : null}
        {user_id == gif.creator.id_user && jwtToken? (
          <IconButton>
        <Edit gif={gif} id={gif.id_gif}/>
        </IconButton>
        ) : null}
         
        {  user_role != 'Admin' && user_id != gif.creator.id_user && jwtToken  ?(
                
                <IconButton onClick={() => handleReport(gif.id_gif)}> <ReportIcon  /> </IconButton>
                
              
              ) : null}
               {user_role == 'Admin'  && jwtToken ? (
                    <IconButton>
             <Ban id={gif.id_gif}/>
    </IconButton>
  ) : null}
     

        
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
                 
                  </div>
                  
</>
           
        
</div>
        ))}
        
        
        
        </Masonry>
      </InfiniteScroll>
      <ToastContainer
                   transition={Zoom}
                   position="top-right"
                   limit={1}
                   autoClose={500}
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

export default GifPage;