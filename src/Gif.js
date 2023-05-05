import React, { useState, useEffect } from 'react';
import Gif from './Home'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { IconButton } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

function GifPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Cat0');
  const [searchResultsIds, setSearchResultsIds] = useState([]);
  const [previousCategory, setPreviousCategory] = useState(null);
  const handleSearch = () => {
    fetch(`http://localhost:8889/search/tag/${searchTerm}?page=${page}`)
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

  const handleCategorySelect = () => {
    fetch(`http://localhost:8889/search/category/${selectedCategory}?page=${page}`)
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

  const handleLike = async (id) => {
    const token = localStorage.getItem('jwtToken');
    const url = `http://localhost:8889/api/like?id_gif=${id}`;
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
  
  return (
    
    <div>
      <div className='search-bar'>
      <input type='text' placeholder='Wyszukaj...' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <button type='submit' onClick={handleSearch} >Search</button>
      <InfiniteScroll
      dataLength={searchResults.length}
      next={() => handleSearch(searchTerm)}
      hasMore={true}
      onScroll={() => handleSearch(searchTerm)}
      scrollThreshold={0.8}
    >
        
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
          <option value="Cat0">--Wybierz kategorię--</option>
          <option value="Cat1">Cat1</option>
          <option value="Cat2">Cat2</option>
          <option value="Cat3">Cat3</option>
        </select>
        </InfiniteScroll>
      </div>
      
      <div className='search-results'>
      
            {searchResults.map(gif => (
              <li key={gif.id_gif}>
                <img src={`http://localhost:8889${gif.reflink}`} alt={gif.title} style={{width: '200px', height: '200px'}}/>
                <IconButton onClick={() => handleLike(gif.id_gif)}>
                  <ThumbUpIcon />
                  <span style={{ color:'white'}}>{gif.likeCount}</span>
                </IconButton>
              </li>
            ))}
          
        
      </div>
      {( searchResults.length === 0) &&  <Gif/>}
    </div>
    
  );
}

export default GifPage;