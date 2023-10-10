import './Description.css';

function Description({aboutRef}) { 

    return ( 
            <section className="description" ref={aboutRef}>
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
                        <p className="description__timing-title description__timing-title_colored">1 неделя</p>
                        <p className="description__timing-text">Back-end</p>
                    </li>
                    <li>
                        <p className="description__timing-title">4 недели</p>
                        <p className="description__timing-text">Front-end</p>
                    </li>
                </ul>
            </section>
    
    );
}

export default Description;