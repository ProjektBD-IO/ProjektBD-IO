import Nav from './Navbar';
import './index.css';
import SearchBar from './search';
import Gif from './Home';
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
