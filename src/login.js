import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginForm(props) {
  
const FormStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const InputStyle = {
  margin: '10px',
  padding: '5px',
  borderRadius: '4px',
  border: '1px solid #8A2BE2',
};

const SubmitButtonStyle = {
  color: 'white',
  backgroundColor: '#8A2BE2',
  borderRadius: '4px',
  height: '30px',
  width: '100px',
  marginTop: '10px',
};
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user_id, setUserid] = useState();
  const [user_role, setUserrole] = useState();
  const [isMailConfirmed, setisMailConfirmed] = useState();
  const [ifBanned, setifBanned] = useState();
  const [banExpiration, setbanExpiration] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      toast.warn('Podaj login i hasło', {
        position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
      });
      console.log('Wprowadź login i hasło');
      return;
    }
    
    try {
      const response = await fetch(`${window.API_URL}/api/services/controller/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          banExpiration: banExpiration,
          ifBanned: ifBanned,
          nickname: username,
          password: password,
          userid: user_id,
          userro: user_role,
          isMailConfirmed: isMailConfirmed
        })
      });

      if (response.ok) {
        // Logowanie pomyślne
        const data = await response.json();
        console.log(data);
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('user_role', data.user_role);
        localStorage.setItem('isMailConfirmed', data.isMailConfirmed);
        localStorage.setItem('ifBanned', data.ifBanned);
        localStorage.setItem('banExpiration', data.banExpiration);

        setIsLoggedin(true);
        window.location.reload();
      } else {
        toast.warn('Błędny login lub hasło', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        console.log('Błędne dane logowania');
      }
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
  if (isLoggedin) {
    window.location.search = '?login1=true'; // Add the 'login1=true' parameter to the URL after successful login
  }
}, [isLoggedin]);

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('login1') === 'true') {
    params.delete('login1'); // Remove the 'login1' parameter from the URL after displaying the toast message
    const newUrl = '/' + params.toString();
    window.history.replaceState(null, '', newUrl); // Update the URL without the 'login1' parameter
    window.location.reload();

    // Refresh the page after successful login
   
  }
}, []);
  return (
    <form onSubmit={handleSubmit} style={FormStyle} >
      <label className="usernameLabel">
        Login:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          style={InputStyle}
        />
      </label>
      <br />
      <label className="usernameLabel">
        Hasło:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={InputStyle}
        />
      </label>
      <br />
      {isLoggedin ? (
        <div>
         <p style={{ color: '#8A2BE2' }}>Witaj {localStorage.getItem('username')}</p>
         </div>
      ) : (
        <button type="submit" style={SubmitButtonStyle}>
          Zaloguj się
        </button>
      )}
      <p>Nie masz konta?</p><Link to="/register">Zarejestruj się</Link>
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

export default LoginForm;