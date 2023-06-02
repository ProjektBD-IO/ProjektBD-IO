import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddFileModal from './add';
import ReportList from './report';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Nav = () => {
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
        <AddFileModal />
        {isLoggedIn ? (
          <>
            <p>Witaj, {localStorage.getItem('username')}</p>
            <button
              onClick={handleLogout}
              style={{
                color: 'white',
                backgroundColor: '#663399',
                borderRadius: '8px',
                height: '38px',
                width: '300px'
              }}
            >
              Wyloguj się
            </button>
            
            {user_role === 'Admin' && jwtToken ? (
              <div className="links">
                <Link to="/reporty" style={{ color: 'white', backgroundColor: '#663399', borderRadius: '8px' }}>
                  Zgłoszenia
                </Link>
              </div>
            ) : null}
             <Link to="/MojeGify" style={{ color: 'white', backgroundColor: '#663399', borderRadius: '8px', width:'30%' }}> Moje Gify</Link>
            {isMailConfirmed ? null : (
              <Alert severity="warning">Potwierdź swój email</Alert>
            )}
             {ifBanned ? null : (
              
              <p style={{ color: 'red' }}>
      Jesteś zbanowany do: {banExpiration}. Możesz teraz tylko przeglądać gify
    </p>
            )}
          </>
        ) : (
          <>
            <Link to="/login1" style={{ color: 'white', backgroundColor: '#663399', borderRadius: '8px' }}>
              Zaloguj się
            </Link>
            <Link to="/register" style={{ color: 'white', backgroundColor: '#663399', borderRadius: '8px' }}>
              Rejestracja
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;