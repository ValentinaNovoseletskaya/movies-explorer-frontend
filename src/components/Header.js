import logo from '../images/logo.png';
import { Link, useLocation } from "react-router-dom";
import HeaderMenu from './HeaderMenu';

function Header({useLoggedInToken, handleMenuClick}) {
    const location = useLocation();
    return (
        <header className={`header ${ location.pathname === "/" ? "header_main" : "" }`}>
            <Link to="/"><img className="logo" src={logo} alt="Логотип" /></Link>                
            <HeaderMenu useLoggedInToken={useLoggedInToken} handleMenuClick={handleMenuClick}/>         
        </header>
    );
}

export default Header;