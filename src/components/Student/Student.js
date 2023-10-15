import './Student.css';
import { Link } from "react-router-dom";
import photo from '../../images/photo.jpg';

function Student() {

    return (
        <section className="student">
            <h2 className="section-title">Студент</h2>
            <article className="student__container">
                <div className="student__info">
                    <h3 className="student__name">Виталий</h3>
                    <p className="student__about">Фронтенд-разработчик, 30 лет</p>
                    <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
        и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <Link target="_blank" to="https://github.com/ValentinaNovoseletskaya" className="student__link">Github</Link>
                </div>
                <img className="student__photo" src={photo} alt="Фотограция студента" />                    
            </article>
        </section>
    );
}

export default Student;