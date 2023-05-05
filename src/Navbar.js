import React from 'react';
import { Link } from 'react-router-dom';
import AddFileModal from './add';
const Nav = () => {
  return (
    <nav className="nav">
      <h1>ChanGifs</h1>
      <div className="links">
        <a href="/">Strona główna</a>
        <AddFileModal/>
        <Link to="/login" style={{ color: 'white', backgroundColor: '#663399', borderRadius: '8px' }}>Zaloguj się</Link>
        <Link to="/register" style={{ color: 'white', backgroundColor: '#663399', borderRadius: '8px' }}>Rejestracja</Link>
        
      </div>
    </nav>
  );
};

export default Nav;