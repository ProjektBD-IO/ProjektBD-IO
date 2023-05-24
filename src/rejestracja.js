import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function RegistrationForm() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    nickname: '',
    role: 'User'
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${window.API_URL}/services/controller/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
    setRegistrationSuccess(true);
    setRedirectToHome(true);
    // Handle response
    toast.success('Zarejestrowano pomyślnie', {
      position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      {registrationSuccess && (
        <p className="successMessage">Registration successful!</p>
      )}
      <label className="usernameLabel">
        Email:
        <input type="email" name="mail" value={formData.mail} onChange={handleChange} required />
      </label>
      <label className="usernameLabel">
        Hasło:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <label className="usernameLabel">
        Login:
        <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
      </label>
      <button
        type="submit"
        style={{
          color: 'white',
          backgroundColor: '#663399',
          borderRadius: '4px',
          height: '35px'
        }}
      >
        Zarejestruj
      </button>
      <ToastContainer
position="top-right"
autoClose={500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </form>
  );
}

export default RegistrationForm;