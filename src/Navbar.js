import Add from './upload';
import  DropdownMenu  from './kategorie';
const Nav = () => {
    return ( 
        <nav className="nav" >
            <h1>ChanGifs </h1>
            <div className="links" >
                <a href="/" >Strona główna </a>
                <button onClick={Add} style={{
                    color: "white",
                    backgroundColor: '#663399',
                    borderRadois: '8px'}}
                >Dodaj Gifa</button>
                 <DropdownMenu  label="Kategorie"  >
                    <a href="sport">sport</a>
                    <a href="filmy">filmy</a>
                    <a href="seriale">seriale</a>
                </DropdownMenu >
                <button onclick="window.location.href='strona_logowania.html'"
                style={{
                    color: "white",
                    backgroundColor: '#663399',
                    borderRadois: '8px'}}>Zaloguj się</button>
            </div>
        </nav>
     );
            }
            
export default Nav;