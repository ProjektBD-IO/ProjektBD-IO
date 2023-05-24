import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddFileModal from './add';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nav = () => {
  const isLoggedIn = localStorage.getItem('jwtToken') !== null;
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedOut(true);
  };

  useEffect(() => {
    if (isLoggedOut) {
      toast.success('Wylogowano', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.location.search = '?logout=true'; // Dodaj parametr 'logout=true' do adresu URL po wylogowaniu
    }
  }, [isLoggedOut]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('logout') === 'true') {
      toast.success('Wylogowano', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      params.delete('logout'); // Usuń parametr 'logout' z adresu URL po wyświetleniu toasta
      const newUrl = window.location.pathname + '?' + params.toString();
      window.history.replaceState(null, '', newUrl); // Zaktualizuj adres URL bez parametru 'logout'
    }
  }, []);

  return (
    <nav className="nav">
      <h1>ChanGifs</h1>
      <div className="links">
        <a href="/">Strona główna</a>
        <AddFileModal />
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} style={{ color: 'white', backgroundColor: '#663399', borderRadius: '8px', height: '35px', width: '200px' }}>Wyloguj się</button>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </>

        ) : (
            <>
              <Link to="/login" style={{ color: 'white', backgroundColor: '#663399', borderRadius: '8px' }}>
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