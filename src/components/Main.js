import landing_picture from '../images/landing_picture.png';
import photo from '../images/photo.jpg';
import row from '../images/row.png';

function Main() {
    return (
        <main className="main">
            <section className="land">
                <div className="land__container">
                    <h1 className="land__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="land__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                    <button className="land__button">Узнать больше</button>
                </div>
                <img className="land__picture" src={landing_picture} alt="Планета веб" />
            </section>
            <section className="description">
                <h2 className="section-title">О проекте</h2>
                <ul className="description__stages">
                    <li>
                        <p className="description__stages-title">Дипломный проект включал 5 этапов</p>
                        <p className="description__stages-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </li>
                    <li>
                        <p className="description__stages-title">На выполнение диплома ушло 5 недель</p>
                        <p className="description__stages-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </li>
                </ul>
                <ul className="description__timing">
                    <li>
                        <p className="description__timing-title description__timing-title_color_green">1 неделя</p>
                        <p className="description__timing-text">Back-end</p>
                    </li>
                    <li>
                        <p className="description__timing-title">4 недели</p>
                        <p className="description__timing-text">Front-end</p>
                    </li>
                </ul>
            </section>
            <section className="technologies">
                <h2 className="section-title">Технологии</h2>
                <p className="technologies__title">7 технологий</p>
                <p className="technologies__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="technologies__elements">
                    <li>
                        <p className="technologies__element">HTML</p>                        
                    </li>
                    <li>
                        <p className="technologies__element">CSS</p>                        
                    </li>
                    <li>
                        <p className="technologies__element">JS</p>                        
                    </li>
                    <li>
                        <p className="technologies__element">React</p>                        
                    </li>
                    <li>
                        <p className="technologies__element">Git</p>                        
                    </li>
                    <li>
                        <p className="technologies__element">Express.js</p>                        
                    </li>
                    <li>
                        <p className="technologies__element">mongoDB</p>                        
                    </li>
                </ul>
            </section>
            <section className="student">
                <h2 className="section-title">Студент</h2>
                <div className="student__container">
                    <div className="student__info">
                        <p className="student__name">Виталий</p>
                        <p className="student__about">Фронтенд-разработчик, 30 лет</p>
                        <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <p className="student__link">Github</p>
                    </div>
                    <img className="student__photo" src={photo} alt="Фотограция студента" />                    
                </div>
            </section>
            <section className="portfolio">
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__types">
                    <li className="portfolio__container portfolio__container_type_underlined">
                        <p className="portfolio__type">Статичный сайт</p>
                        <p><img className="portfolio__link" src={row} alt="Переход по ссылке" /></p>
                    </li>
                    <li className="portfolio__container portfolio__container_type_underlined">
                        <p className="portfolio__type">Адаптивный сайт</p>
                        <p><img className="portfolio__link" src={row} alt="Переход по ссылке" /></p>
                    </li>
                    <li className="portfolio__container">
                        <p className="portfolio__type">Одностраничное приложение</p>
                        <p><img className="portfolio__link" src={row} alt="Переход по ссылке" /></p>
                    </li>
                </ul>
            </section>
        </main>          
    );
}

export default Main;