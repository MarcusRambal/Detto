

import './Header.css'; 
function Header () { 

    return (

        <header className="header">
            <nav className="headerNav">
                <ul className="headerNavList">
                    <li className="headerNavItem"><a href="#home">Home</a></li>
                    <li className="headerNavItem"><a href="#about">About</a></li>
                    <li className="headerNavItem"><a href="#services">Services</a></li>
                    <li className="headerNavItem"><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>

    );

}



export default Header;