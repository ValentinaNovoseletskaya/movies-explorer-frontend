function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">            
                <p className="footer__copyright">&#169; 2020</p>
                <div className="footer__links">
                    <p className="footer__link">Яндекс.Практикум</p>
                    <p className="footer__link">Github</p>
                </div>
            </div>
            {/* <Routes>
                <Route path="/" element={
                    <>
                    {headerText}
                    </>
                }>
                </Route>
                <Route path="/signup" element={
                    <Link to="/signin" className="sign__link">Войти</Link>
                }>
                </Route>
                <Route path="/signin" element={
                    <Link to="/signup" className="sign__link">Регистрация</Link>
                }>
                </Route>
            </Routes> */}
        </footer>          
    );
}

export default Footer;