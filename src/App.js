import Nav from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Gif from './Home';
import GifPage from './Gif'
import RegistrationForm from './rejestracja';
import LoginForm from './login';
import { useState } from 'react'
import Gif1 from './gif1';
function App() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="App">
      <Router>
      <Nav />
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegistrationForm/>}/>
      </Routes>
    </Router>
      <div className="content"> 
      <GifPage searchResults={searchResults} setSearchResults={setSearchResults} />
      </div>
    </div>
  );
}

export default App;
