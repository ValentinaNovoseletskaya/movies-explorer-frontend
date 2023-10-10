import './Technologies.css';

function Technologies() {
    return (
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
    );
}

export default Technologies;