import React, { useState, useEffect, useRef } from 'react';
import Gif from './Home'
import InfiniteScroll from 'react-infinite-scroll-component';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
function GifPage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Cat0');
  const [searchResultsIds, setSearchResultsIds] = useState([]);
  const [previousCategory, setPreviousCategory] = useState(null);
  const [prevtag, setprevtag] = useState(null);
  const [Sort, SetSort] = useState('addDate desc')
  const [prevsort, setprevsort] = useState(null);

  const url=`${window.API_URL}/search/tag/${searchTerm}?page=${page}&sort=${Sort}`;
  const handleSearch = () => {
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        console.log('Dane z serwera:', data);
        const newResults = data.content.filter(gif => !searchResultsIds.includes(gif.id_gif)); // filter out duplicates
        setSearchResults(prevResults => [...prevResults, ...newResults]);
        setSearchResultsIds(prevIds => [...prevIds, ...newResults.map(gif => gif.id_gif)]); // add new IDs to the array
        setPage(page => page + 1);  

        
              
      })
      .catch(error => console.error(error));
  };
  
  useEffect(() => {
    handleSearch();
  }, [page]);
  const url2=`${window.API_URL}/search/category/${selectedCategory}?page=${page}&sort=${Sort}`;
  const handleCategorySelect = () => {
    fetch(url2)
      .then(response => response.json())
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
 
      
  const handleSort = (event) => {
    const sort = event.target.value;
    SetSort(sort);
    if (sort !== "sor") {
      if (sort !== prevsort) {
        setSearchResults([]);
        setSearchResultsIds([]);
        setPage(0);
        setprevsort(sort);
      }
      handleCategorySelect(selectedCategory);
      handleSearch(searchTerm);
      
    } else {
      setSearchResults([]);
      setSearchResultsIds([]);
      setPage(0);
      setprevsort(null);
    }
  };
  const handleTagChange=()=>{
  if (searchTerm !== '') {
  if (searchTerm !== prevtag) {
    setSearchResults([]);
    setSearchResultsIds([]);
    setPage(0);
    setprevtag(searchTerm);
  }
    handleSearch();
  }else {
  setSearchResults([]);
  setSearchResultsIds([]);
  setPage(0);
  setprevtag(null);
}}
const handleLike = async (id) => {
  const token = localStorage.getItem('jwtToken');
  const url = `${window.API_URL}/api/like?id_gif=${id}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id_gif: id })
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
    
    <div>
      <div className='search-bar'>
      <input type='text' placeholder='Wyszukaj...' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <button type='submit' onClick={handleTagChange} >Search</button>
      <InfiniteScroll
      dataLength={searchResults.length}
      next={handleSearch}
      hasMore={true}
      onScroll={handleSearch}
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
              </li>
            ))}
          
        
      </div>
      {( searchResults.length === 0) &&  <Gif handleSort={handleSort} />}
    </div>
    
  );
}

export default GifPage;