import './Header.css';
import logo from '../../images/logo.png';
import { Link, useLocation } from "react-router-dom";
import HeaderMenu from '../HeaderMenu/HeaderMenu';

function Header({handleMenuClick}) {
    const location = useLocation();
    const isMainPage = location.pathname === "/";
    return (
        <>          
            <header className={`header-menu ${ isMainPage ? "header-menu_main" : "" }`}>
                <Link to="/"><img className="header__logo" src={logo} alt="Логотип" /></Link>                
                <HeaderMenu isMainPage={isMainPage} handleMenuClick={handleMenuClick}/>         
            </header>
        </>
    );
}

export default Header;