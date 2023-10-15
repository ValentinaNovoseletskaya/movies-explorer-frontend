import './Navigation.css';
import { Route, Routes, Link } from "react-router-dom";

function Navigation({isMainPage, handleMenuClick}) {
    return (
        <>
            {isMainPage ?
           <Routes>
                <Route path="/" element={
                    <nav className="navigation__container">
                        <Link to="/signup" className="navigation__link">Регистрация</Link>
                        <Link to="/signin" className="navigation__button">Войти</Link>
                    </nav>       
                }>
                </Route>                
            </Routes>
            :
            <>
                <nav className="navigation__movies">
                    <Link to="/movies" className="navigation__link">Фильмы</Link>
                    <Link to="/saved-movies" className="navigation__link">Сохраненные фильмы</Link>
                </nav>
                <div className="navigation__profile">
                    <Link to="/profile" className="navigation__link">Аккаунт
                    <div className="navigation__profile-button"></div></Link>
                </div>          
                <button className="navigation__button-burger" onClick={handleMenuClick}></button>
            </>
            }
        </>
    );
}

export default Navigation;