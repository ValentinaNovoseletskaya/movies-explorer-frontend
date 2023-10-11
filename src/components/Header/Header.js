import './Header.css';
import logo from '../../images/logo.png';
import { Link, useLocation } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

function Header({handleMenuClick}) {
    const location = useLocation();
    const isMainPage = location.pathname === "/";
    return (
        <>          
            <header className={`header navigation ${ isMainPage ? "navigation_main" : "" }`}>
                <Link to="/"><img className="header__logo" src={logo} alt="Логотип" /></Link>                
                <Navigation isMainPage={isMainPage} handleMenuClick={handleMenuClick}/>         
            </header>
        </>
    );
}

export default Header;