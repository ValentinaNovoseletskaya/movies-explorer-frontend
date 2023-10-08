import { Route, Routes, Link } from "react-router-dom"; 

function HeaderMenu({useLoggedInToken, handleMenuClick}) {
    return (
        <>
            {!useLoggedInToken ?
           <Routes>
                <Route path="/" element={
                    <div className="header__container">
                        <Link to="/signup" className="header__link">Регистрация</Link>
                        <Link to="/signin" className="header__button">Войти</Link>
                    </div>       
                }>
                </Route>                
            </Routes>           
            :
            <>
                <div className="header__films">
                    <Link to="/films" className="header__link">Фильмы</Link>
                    <Link to="/savedfilms" className="header__link">Сохраненные фильмы</Link>
                </div>
                <div className="header__profile">
                    <Link to="/profile" className="header__link">Аккаунт
                    <div className="header__profile-button"></div></Link>
                </div>          
                <button className="header__button-burger" onClick={handleMenuClick}></button>
            </>
            }
        </>
    );
}

export default HeaderMenu;