import logo from '../images/logo.png';
import { Route, Routes, Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="Логотип" />
            <Routes>
                <Route path="/" element={
                    <div className="header__container">
                        <Link to="/signup" className="header__link">Регистрация</Link>
                        <Link to="/signin" className="header__button">Войти</Link>
                    </div>
                }>
                </Route>
            </Routes>
        </header>          
    );
}

export default Header;