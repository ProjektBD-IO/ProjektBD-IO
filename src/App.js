import Nav from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import GifPage from './Gif'
import RegistrationForm from './rejestracja';
import LoginForm from './login';

function App() {
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
      <GifPage />
      </div>
    </div>
  );
}

export default App;
