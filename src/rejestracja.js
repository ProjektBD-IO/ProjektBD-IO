import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast, ToastMessage, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loading-icons';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function RegistrationForm() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [isMailConfirmed, setIsMailConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    role: 'User'
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsRegistering(true);
    if (
      formData.password.length < 7 ||
      !/[A-Z]/.test(formData.password) ||
      !/[!@#$%^&*]/.test(formData.password)
    ) {
      setPasswordRequirements('Hasło musi mieć przynajmniej 7 znaków, zawierać jedną dużą literę i znak specjalny');
      setIsRegistering(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordRequirements('Hasła nie pasują do siebie');
      setIsRegistering(false);
      return;
    }
    setPasswordRequirements('');
    const response = await fetch(`${window.API_URL}/services/controller/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
    setIsMailConfirmed(true);
    setRedirectToHome(true);
    setIsRegistering(false);
    // Handle response
    toast.success('Zarejestrowano pomyślnie', {
      
      position: 'top-right',
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light'
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordRequirements('');
    }
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
    >
      <label className="usernameLabel">
        Email:
        <input type="email" name="mail" value={formData.mail} onChange={handleChange} required />
      </label>
      <label className="usernameLabel">
        Hasło:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="usernameLabel">
        Powtórz hasło:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </label>
      <label className="usernameLabel">
        Login:
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
      </label>
      <div style={{ color: 'red' }}>{passwordRequirements}</div>
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
      {isRegistering && (
        <div className="button-container">
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="info">
              Zaraz otrzymasz wiadomość na pocztę z linkiem uwierzytelniającym. Potwierdź swój email
              klikając w ten link.
            </Alert>
          </Stack>
          <ThreeDots></ThreeDots>
        </div>
      )}

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
  );
}

export default RegistrationForm;