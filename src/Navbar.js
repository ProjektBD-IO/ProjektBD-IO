import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddFileModal from './add';
import ReportList from './report';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Nav = () => {
  const ButtonStyle = {
    color: 'white',
    backgroundColor: '#8A2BE2',
    borderRadius: '8px',
    padding: '10px 20px',
    textDecoration: 'none',
    margin: '10px',
  };
  const isLoggedIn = localStorage.getItem('jwtToken') !== null;
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const jwtToken = localStorage.getItem('jwtToken');
  const user_id = localStorage.getItem('user_id');
  const user_role = localStorage.getItem('user_role');
  const [isMailConfirmed, setIsMailConfirmed] = useState(localStorage.getItem('isMailConfirmed') === 'true');
  const [ifBanned, setIfBanned] = useState(localStorage.getItem('ifBanned') === 'false');
  const banExpiration = localStorage.getItem('banExpiration');
  
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedOut(true);
    window.location.href = "/";
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('logout') === 'true') {
      params.delete('logout');
      const newUrl = window.location.pathname + '?' + params.toString();
      window.history.replaceState(null, '', newUrl);
    }
  }, []);

  useEffect(() => {
    if (isLoggedOut) {
      window.location.search = '?logout=true';
    }
  }, [isLoggedOut]);

  return (
    <nav className="nav">
      <h1>ChanGifs</h1>
      <div className="links">
        <a href="/">Strona główna</a>
        
        {isLoggedIn ? (
          <>
          <AddFileModal />
            <p style={{color:'#8A2BE2'}}>Witaj, {localStorage.getItem('username')}</p>
            <Link to="/"
              onClick={handleLogout}
              style={ButtonStyle}
            >
              Wyloguj się
            </Link>
              
           
            
            {user_role === 'Admin' && jwtToken ? (
              <div className="links">
                <Link to="/reporty"style={ButtonStyle}>
                  Zgłoszenia
                </Link>
              </div>
            ) : null}
             <Link to="/MojeGify" style={ButtonStyle}> Moje Gify</Link>
             <div style={{display: 'flex', flexDirection:'column', justifyContent: 'flex-end'}}>
             {isMailConfirmed ? null : (
  <div style={{ position: 'absolute', top: '10px', right: '10px', width: '200px'}}>
    <Alert severity="warning">Potwierdź swój email</Alert>
    </div> )}
    
{ifBanned ? null : (
      <div style={{ color:'red', position: 'absolute', top: '85px', right: '10px', width: '200px'}}>
        Jesteś zbanowany do: {banExpiration}. Możesz teraz tylko przeglądać gify
      </div>
    )}
    </div>
   
            
          </>
        ) : (
          <>
            <Link to="/login1" style={ButtonStyle}>
              Zaloguj się
            </Link>
            <Link to="/register" style={ButtonStyle}>
              Rejestracja
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;