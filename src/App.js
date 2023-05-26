import Nav from './Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import GifPage from './Gif'
import RegistrationForm from './rejestracja';
import LoginForm from './login';
import ReportList from './report';
import { BrowserRouter  } from "react-router-dom";
import Gifp from './podstronagifa';
function App() {
  return (
    <div className="App">
      
      <Router>
        
      <Nav />
      <Routes>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegistrationForm/>}/>
        
      </Routes>
    
      <div className="content"> 
      <GifPage />
      <Routes>
        <Route path="/podstrona/?gif_id=6" element={<Gifp/>}/>
      </Routes>
      </div>
      </Router>
    </div>
    
  );
}

export default App;
