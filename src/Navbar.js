import Add from './upload';
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
                <a href="/Categories" style={{
                    color: "white",
                    backgroundColor: '#663399',
                    borderRadois: '8px'
                }}>Kategorie</a>
                <a href="/Categories" style={{
                    color: "white",
                    backgroundColor: '#663399',
                    borderRadois: '8px'
                }}>Zaloguj się</a>
                
            </div>
        </nav>
     );
            }
            
export default Nav;