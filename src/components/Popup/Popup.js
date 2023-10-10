import './Popup.css';
import { Link } from "react-router-dom";

function Popup({isMenuOpen, handleCloseMenuClick}) {
    return (
        <div className={`popup ${isMenuOpen ? "popup_opened" : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={handleCloseMenuClick}></button>
                <div className="popup__menu">
                    <Link to="/" className="popup__main">Главная</Link>
                    <Link to="/movies" className="popup__films">Фильмы</Link>
                    <Link to="/saved-movies" className="popup__saved-films">Сохраненные фильмы</Link>
                </div>
                <div className="popup__profile">
                    <Link to="/profile" className="popup__profile-link">Аккаунт
                    <div className="popup__profile-button"></div></Link>
                </div>
            </div>
        </div>
    );
}

export default Popup;