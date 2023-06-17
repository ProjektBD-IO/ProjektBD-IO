import React, { useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddFileModal() {
  const ButtonStyle = {
    color: 'white',
    backgroundColor: '#8A2BE2',
    borderRadius: '8px',
    padding: '10px 20px',
    textDecoration: 'none',
    margin: '10px',
    border: 'none'
  };
  const [formData, setFormData] = useState({
    file: null,
    category: 'Humor',
    tags: '',
    title:'',
    gifType:'true'
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const token = localStorage.getItem('jwtToken');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const filed = event.target.file.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (filed.size > maxSize) {
      alert('Maksymalny rozmiar pliku to 10MB');
      return;
    }
    // Sprawdź rozszerzenie pliku
    const allowedExtensions = /(\.gif)$/i;
    if (!allowedExtensions.exec(filed.name)) {
      alert('Dozwolone są tylko pliki z rozszerzeniem .gif');
      return;
    }
    if (!filed.name.endsWith('.gif')) {
      alert('Nazwa pliku musi kończyć się rozszerzeniem .gif');
      return;
    }
    
    const formDataToSend = new FormData();
    formDataToSend.append('file', formData.file);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('tags', formData.tags);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('gifType', formData.gifType);

    const response = await fetch(`${window.API_URL}/api/gif`, {
      body: formDataToSend,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
        mode: "cors",
    });
    if (response.ok) {
     
      setModalIsOpen(false);
      window.location.reload();
    } else {
     
    const data = await response;
    console.log(data);

    // Handle response

    setModalIsOpen(false);
    window.location.reload();
  }};

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  

  return (
    <div>
      <button  onClick={() => setModalIsOpen(true)} style={ButtonStyle}>Dodaj gifa</button>
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none', // Usunięcie obramowania
      background: '#fff', // Tło modalu
      borderRadius: '8px', // Zaokrąglone rogi
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Cień
      padding: '20px' // Wewnętrzny odstęp
    }
  }}
>
<h2 style={{ marginBottom: '20px' }}>Dodaj gif</h2>
<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
<label style={{position: 'relative', display: 'inline-block' }}>
  
  <input type="file" name="file" onChange={handleFileChange} required  />
</label>
  <label style={{ marginBottom: '10px' }}>
    Kategoria:
    <select name="category" onChange={handleChange} style={{ marginTop: '5px' }}>
      <option value="Humor">Humor</option>
      <option value="Sport">Sport</option>
      <option value="Zwierzęta">Zwierzęta</option>
    </select>
  </label>
  <label style={{ marginBottom: '10px' }}>
    Tagi:
    <input type="text" name="tags" value={formData.tags} onChange={handleChange} style={{ marginTop: '5px' }} />
  </label>
  <label style={{ marginBottom: '10px' }}>
    Tytuł:
    <input type="text" name="title" value={formData.title} onChange={handleChange} style={{ marginTop: '5px' }} />
  </label>
  <label style={{ marginBottom: '10px' }}>
    Prywatny:
    <select name="gifType" value={formData.gifType} onChange={handleChange} style={{ marginTop: '5px' }}>
      <option value="false">Tak</option>
      <option value="true">Nie</option>
    </select>
  </label>
  <button type="submit" style={ButtonStyle}>Dodaj</button>
</form>
      </Modal>


      
    </div>
  );
}

export default AddFileModal;