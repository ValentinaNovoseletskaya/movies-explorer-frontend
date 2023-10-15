import './Popup.css';
import { Link, useLocation } from "react-router-dom";

function Popup({isMenuOpen, handleCloseMenuClick}) {
    const location = useLocation();

    return (
        <div className={`popup ${isMenuOpen ? "popup_opened" : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={handleCloseMenuClick}></button>
                <nav className="popup__menu">
                    <Link to="/" className={`popup__main ${location.pathname === "/" ? "popup__main_active" : ''}`} onClick={handleCloseMenuClick}>Главная</Link>
                    <Link to="/movies" className={`popup__movies ${location.pathname === "/movies" ? "popup__movies_active" : ''}`} onClick={handleCloseMenuClick}>Фильмы</Link>
                    <Link to="/saved-movies" className={`popup__saved-movies ${location.pathname === "/saved-movies" ? "popup__saved-movies_active" : ''}`} onClick={handleCloseMenuClick}>Сохраненные фильмы</Link>
                </nav>
                <div className="popup__profile">
                    <Link to="/profile" className="popup__profile-link">Аккаунт
                    <div className="popup__profile-button"></div></Link>
                </div>
            </div>
        </div>
    );
}

export default Popup;