import './Footer.css';
import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">            
                <p className="footer__copyright">&#169; 2020</p>
                <div className="footer__links">
                    <Link className="footer__link" target="_blank" to="https://practicum.yandex.ru/" >Яндекс.Практикум</Link>
                    <Link className="footer__link" target="_blank" to="https://github.com/ValentinaNovoseletskaya" >Github</Link>
                    
                </div>
            </div>
        </footer>          
    );
}

export default Footer;