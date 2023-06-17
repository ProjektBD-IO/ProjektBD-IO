import Nav from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GifPage from './Gif';
import RegistrationForm from './rejestracja';
import LoginForm from './login';
import ReportList from './report';
import Gifen from './Podstrona';
import FolderGifs from './gifsinfolder';
import FolderComponent from './folder';
import Category from './category';
import Tag from './tag';
import { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);

  useEffect(() => {
    // Sprawdź, czy w localStorage jest zapisana informacja o trybie
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }

    // Sprawdź, czy adres email został potwierdzony
    setIsEmailConfirmed(window.location.search.includes('redirect=1'));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    if (isEmailConfirmed) {
      toast.success('Potwierdzono adres email', {
        position: 'top-right',
        autoClose: 1100,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isEmailConfirmed]);

  const toggleDarkMode = () => {
    const updatedMode = !darkMode;
    setDarkMode(updatedMode);
    // Zapisz tryb w localStorage
    localStorage.setItem('darkMode', JSON.stringify(updatedMode));
  };

  return (
    <div className="App">
      <Router>
        <Nav />
        <button className={`toggle-button ${darkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
          {darkMode ? 'Tryb Jasny' : 'Tryb Ciemny'}
        </button>
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
      <ToastContainer transition={Zoom} position="top-right" limit={1} autoClose={1} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover={false} theme="light" />
    </div>
  );
}

export default App;