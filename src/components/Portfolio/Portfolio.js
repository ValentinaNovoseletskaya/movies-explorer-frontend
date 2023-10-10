import './Portfolio.css';
import { Link } from "react-router-dom";

function Portfolio() {
    return (
            <section className="portfolio">
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__types">
                    <li className="portfolio__container portfolio__container_underlined">
                        <p className="portfolio__type">Статичный сайт</p>
                        <Link className="portfolio__link" target="_blank" to="https://github.com/ValentinaNovoseletskaya/how-to-learn"></Link>
                    </li>
                    <li className="portfolio__container portfolio__container_underlined">
                        <p className="portfolio__type">Адаптивный сайт</p>
                        <Link className="portfolio__link" target="_blank" to="https://github.com/ValentinaNovoseletskaya/russian-travel"></Link>
                    </li>
                    <li className="portfolio__container">
                        <p className="portfolio__type">Одностраничное приложение</p>
                        <Link className="portfolio__link" target="_blank" to="https://valentina.students.nomoredomainsicu.ru"></Link>
                    </li>
                </ul>
            </section>
    );
}

export default Portfolio;