import React, { useState } from 'react';
import Modal from 'react-modal';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
function Edit({ gif, id }) {
  const [formData, setFormData] = useState({
    category: gif.category.category_name,
    tags: gif.tags,
    title: gif.title,
    gifType: gif.gifType,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.log('Brak tokenu JWT. Nieautoryzowany dostęp.');
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append('category', formData.category);
      formDataToSend.append('tags', formData.tags);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('gifType', formData.gifType);
      const encodedTags = encodeURIComponent(formData.tags);
      const response = await fetch(`${window.API_URL}/api/gif/edit/${id}?category=${formData.category}&tags=${encodedTags}&title=${formData.title}&gifType=${formData.gifType}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });
      console.log('gif:', gif);
      console.log('gif.category:', gif.category);
      if (response.ok) {
        console.log('Gif został zaktualizowany');
        setModalIsOpen(false);
      } else {
        console.log('Wystąpił problem podczas edycji gifa');
      }
    } catch (error) {
      console.log('Wystąpił błąd sieci', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>

      <IconButton onClick={() => setModalIsOpen(true)}> <EditIcon/> </IconButton>
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
        <h2>Edytuj gif</h2>
        <form onSubmit={handleEdit}>
          <label>
          Kategoria:
          <select name="category" onChange={handleChange} value={formData.category}>
          
          <option value="Humor">Humor</option>
      <option value="Sport">Sport</option>
      <option value="Zwierzęta">Zwierzęta</option>
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
          <button type="submit" >Zapisz zmiany</button>
        </form>
      </Modal>
    </div>
  );
}

export default Edit;