import React, { useState } from 'react';
import Modal from 'react-modal';

function AddFileModal() {
  const [formData, setFormData] = useState({
    file: null,
    category: '',
    tags: '',
    title:''
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('file', formData.file);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('tags', formData.tags);
    formDataToSend.append('title', formData.title);

    const response = await fetch('http://localhost:8889/api', {
      method: 'POST',
      body: formDataToSend
    });
    const data = await response.json();
    console.log(data);

    // Handle response

    setModalIsOpen(false);
  };

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
        <select onChange={handleChange}>
          <option value="">Wybierz kategorię</option>
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
          <button type="submit">Add File</button>
        </form>
      </Modal>
    </div>
  );
}

export default AddFileModal;