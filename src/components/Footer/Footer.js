import './Footer.css';

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
        </footer>          
    );
}

export default Footer;