import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast, ToastMessage, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loading-icons';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
function RegistrationForm() {
  const LabelStyle = {
    marginRight: '270px',
    
  };
  const LabelStyles = {
    marginRight: '200px',
    
  };
 
  const FormStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  };
  
  const InputStyle = {
    margin: '10px',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #8A2BE2',
    width: '300px'
    
  };
  
  const SubmitButtonStyle = {
    color: 'white',
    backgroundColor: '#8A2BE2',
    borderRadius: '4px',
    height: '30px',
    width: '100px',
    marginTop: '10px',
  };
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
    if (response.status === 500 && data.message === 'User with this email already exists') {
      toast.warn('Użytkownik o takim mailu już istnieje', {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light'
      });
     
      setIsRegistering(false);
      setRedirectToHome(false);
      return;
    }
    if(response.status === 500 && data.message==='User with this nickname already exists'){
      toast.warn('Ten login jest już zajęty', {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light'
      });
      setIsRegistering(false);
      setRedirectToHome(false);
      return;
    }
    console.log(data);
    setIsMailConfirmed(true);
    setRedirectToHome(true);
    setIsRegistering(false);
    // Handle response
    toast.success('Zarejestrowano pomyślnie', {
      
      position: 'top-right',
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: false,
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
      style={FormStyle}
    >
      <label className="usernameLabel" style={LabelStyle}>
        Email</label>
        <input type="email" name="mail" value={formData.mail} onChange={handleChange} required style={InputStyle} />
        
      
      <label className="usernameLabel" style={LabelStyle}>
        Hasło</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={InputStyle}
        />
      
      <label className="usernameLabel" style={LabelStyles}>
        Powtórz hasło      </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={InputStyle}
        />
      
      <label className="usernameLabel " style={LabelStyle}>
        Login</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
          style={InputStyle}
        />
      
      
      <div style={{ color: 'red' }}>{passwordRequirements}</div>
      <button
        type="submit"
        style={SubmitButtonStyle}
      >
        Zarejestruj
      </button>
      {isRegistering && (
        <div className="button-container">
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="info">
              Zaraz otrzymasz wiadomość na pocztę z linkiem uwierzytelniającym. Potwierdź swój email
              klikając w ten link. Za kilka sekund zostaniesz automatycznie przeniesiony na stronę główną
            </Alert>
          </Stack>
          
            <ThreeDots stroke="#8A2BE2" fill="#B0E0E6"/>
          
        </div>
      )}
      <p>Masz już konto?</p><Link to='/login1'> Zaloguj się</Link>

<ToastContainer
                   transition={Zoom}
                  position="top-right"
                  limit={1}
                  autoClose={1}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={false}
                  pauseOnHover={false}
                  theme="light"
                  />
    </form>
  );
}

export default RegistrationForm;


