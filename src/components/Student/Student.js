import './Student.css';
import { Link } from "react-router-dom";
import photo from '../../images/photo.jpg';

function Student() {

    return (
        <section className="student">
            <h2 className="section-title">Студент</h2>
            <article className="student__container">
                <div className="student__info">
                    <h3 className="student__name">Валентина</h3>
                    <p className="student__about">Фронтенд-разработчик, 34 года</p>
                    <p className="student__text">Я родилась в Якутии и переехала в Москву после школы. Имею высшее образование в управлении проектами. 
                    Когда работала в частном детском саду, занималась разнообразными задачами, в том числе созданием и ведением сайта и подключением CRM системы. 
                    С этого момента заинтересовалась областью веб-разработки. В 2022 году выбрала учебу веб-разработчиком в Яндекс Практикуме.</p>
                    <Link target="_blank" to="https://github.com/ValentinaNovoseletskaya" className="student__link">Github</Link>
                </div>
                <img className="student__photo" src={photo} alt="Фотограция студента" />                    
            </article>
        </section>
    );
}

export default Student;