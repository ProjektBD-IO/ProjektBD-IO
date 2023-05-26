import React, { useState, useEffect } from 'react';

function Gifp({ id }) {
  const [gifData, setGifData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGifData = async () => {
      try {
        const response = await fetch(`${window.API_URL}/api/gif/${id}`);
        if (response.ok) {
          const data = await response.json();
          setGifData(data);
        } else {
          console.log('Failed to fetch GIF data');
        }
      } catch (error) {
        console.log('Network error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGifData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!gifData) {
    return <p>Failed to fetch GIF data.</p>;
  }

  const { category, tags, title,  } = gifData;

  return (
    <div>
      <h2>Tytuł:{gif.title}</h2>
      <p>Kategoria: {gif.category_name}</p>
      <p>Tags: {gif.tags}</p>
      
    </div>
  );
}

export default Gifp;