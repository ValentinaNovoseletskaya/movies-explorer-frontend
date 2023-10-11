import './Portfolio.css';
import { Link } from "react-router-dom";
import arrow from "../../images/arrow.svg"

function Portfolio() {
    return (
            <section className="portfolio">
                <h2 className="portfolio__title">Портфолио</h2>
                <div className="portfolio__types">
                    <Link className="portfolio__container" target="_blank" to="https://valentina.students.nomoredomainsicu.ru">
                        <p className="portfolio__type">Статичный сайт</p>
                        <img className="portfolio__link" src={arrow} alt="Стрелка" />
                    </Link>
                    <Link className="portfolio__container" target="_blank" to="https://valentina.students.nomoredomainsicu.ru">
                        <p className="portfolio__type">Адаптивный сайт</p>
                        <img className="portfolio__link" src={arrow} alt="Стрелка" />
                    </Link>
                    <Link className="portfolio__container" target="_blank" to="https://valentina.students.nomoredomainsicu.ru">
                        <p className="portfolio__type">Одностраничное приложение</p>
                        <img className="portfolio__link" src={arrow} alt="Стрелка" />
                    </Link>
                </div>
            </section>
    );
}

export default Portfolio;