import './HeaderMenu.css';
import { Route, Routes, Link } from "react-router-dom"; 

function HeaderMenu({isMainPage, handleMenuClick}) {
    return (
        <>
            {isMainPage ?
           <Routes>
                <Route path="/" element={
                    <div className="header-menu__container">
                        <Link to="/signup" className="header-menu__link">Регистрация</Link>
                        <Link to="/signin" className="header-menu__button">Войти</Link>
                    </div>       
                }>
                </Route>                
            </Routes>
            :
            <>
                <div className="header-menu__films">
                    <Link to="/movies" className="header-menu__link">Фильмы</Link>
                    <Link to="/saved-movies" className="header-menu__link">Сохраненные фильмы</Link>
                </div>
                <div className="header-menu__profile">
                    <Link to="/profile" className="header-menu__link">Аккаунт
                    <div className="header-menu__profile-button"></div></Link>
                </div>          
                <button className="header-menu__button-burger" onClick={handleMenuClick}></button>
            </>
            }
        </>
    );
}

export default HeaderMenu;