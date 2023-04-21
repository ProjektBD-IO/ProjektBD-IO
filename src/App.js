import Nav from './Navbar';
import './index.css';
import SearchBar from './searchbar';
import Gif from './Home';
import BasicButtonExample from './kategorie';
function App() {
  return (
    <div className="App">
      <Nav/>
      <SearchBar/>
      <div className="content"> 
        <Gif/>
      </div>
    </div>
  );
}

export default App;
