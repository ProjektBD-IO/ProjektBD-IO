import React, { useState } from 'react';
function Add() {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);
      fetch('/api/gif', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    };
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Tag:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Plik:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Upload GIF</button></form>)
}
export default Add;