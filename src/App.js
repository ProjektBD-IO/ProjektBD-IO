import Nav from './Navbar';
import './index.css';
import SearchBar from './search';
import GifGallery from './Home';
function App() {
  return (
    <div className="App">
      <Nav/>
      <SearchBar/>
      <div className="content"> 
        <GifGallery/>
      </div>
    </div>
  );
}

export default App;
