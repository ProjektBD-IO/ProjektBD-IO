import Nav from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import GifPage from './Gif';
import RegistrationForm from './rejestracja';
import LoginForm from './login';
import ReportList from './report';
import Gifen from './awd';
import FolderGifs from './gifsinfolder';
import FolderComponent from './folder';
import Category from './category';
import Tag from './tag';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const appStyles = {
    backgroundColor: darkMode ? '#000000' : '#F8F8FF',
    color: darkMode ? '#F8F8FF' : '#000000',
  };
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  return (
    <div className="App" style={appStyles}>
      <Router>
        <Nav />
        <button className={`toggle-button ${darkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>Przełącz tryb jasny/ciemny</button>
        <Routes>
          <Route path="/login1" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/podstrona/:id" element={<Gifen />} />
          <Route path="/reporty" element={<ReportList />} />
          <Route path="/MojeGify" element={<FolderComponent />} />
          <Route path="/MojeGify/:id/:name" element={<FolderGifs />} />
        </Routes>
        <div className="content">
          <Routes>
            <Route path="/category/:category" element={<Category />} />
            <Route path="/search/:search" element={<Tag />} />
            <Route path="/" element={<GifPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;