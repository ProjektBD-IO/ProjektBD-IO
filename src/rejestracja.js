import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    nickname: '',
    role: 'User'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${window.API_URL}/services/controller/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);

    // Handle response
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
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;