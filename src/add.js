import React, { useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddFileModal() {
  const [formData, setFormData] = useState({
    file: null,
    category: 'Cat1',
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
      toast.success('Gif dodany pomyślnie', {
        position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      setModalIsOpen(false);
      window.location.reload();
    } else {
      toast.warn('Błąd w dodawaniu gifa', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
    });
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
      <button  onClick={() => setModalIsOpen(true)} style={{ color: 'white', backgroundColor: '#663399', borderRadius: '8px'}}>Dodaj gifa</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }}>
        <h2>Dodaj gifa</h2>
        <form onSubmit={handleSubmit}>
          <label>
            File:
            <input type="file" name="file" onChange={handleFileChange} required />
          </label>
          <label>
          Kategoria:
        <select name="category" onChange={handleChange}>
          
          <option value="Cat1">Cat1</option>
          <option value="Cat2">Cat2</option>
          <option value="Cat3">Cat3</option>
        </select>
          </label>
          <label>
            Tagi:
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
          </label>
          <label>
            Tytuł:
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </label>
          <label>
           Prywatny:
           <select name="gifType" value={formData.gifType} onChange={handleChange}>
           <option value="false">Tak</option>
          <option value="true">Nie</option>
          </select>
          </label>
          <button type="submit">Add File</button>
          <ToastContainer
          transition={Zoom}
          limit={1}
position="top-right"
autoClose={500}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        </form>
      </Modal>
    </div>
  );
}

export default AddFileModal;