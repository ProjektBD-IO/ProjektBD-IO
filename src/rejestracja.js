import React, { useState } from 'react';
function RegistrationForm() {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    nickname: '',
    role: 'User'
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('file', formData.file);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('tags', formData.tags);
  
    const response = await fetch('http://localhost:8889/services/controller/file', {
      method: 'POST',
      body: formDataToSend
    });
  
    if (response.ok) {
      // The file was successfully uploaded
      const data = await response.json();
      console.log(data);
  
      // Reset the form data
      setFormData({
        file: null,
        category: '',
        tags: ''
      });
  
      // Close the modal
      setModalIsOpen(false);
    } else {
      // There was an error uploading the file
      console.error(response.statusText);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="mail" value={formData.mail} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <label>
        Nickname:
        <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
      </label>
  <button type="submit">Zarejestruj</button>
    </form>
  );
}

export default RegistrationForm;