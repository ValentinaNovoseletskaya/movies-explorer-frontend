import './SavedFilms.css';
import film1 from '../../images/film1.jpg';
import film2 from '../../images/film2.jpg';
import film3 from '../../images/film3.jpg';

function SavedFilms() {

    return (         
        <section className="films">
            <div className="cards">
                <div className="card">
                    <img className="card__image" src={film1} alt="Обложка фильма"/>
                    <div className="card__title">
                        <h3 className="card__text">33 слова о дизайне</h3>
                        <button type="submit" className='card__dislike-button'></button>                    
                    </div>
                    <p className="card__time">1ч42м</p>
                </div>      
                <div className="card">
                    <img className="card__image" src={film2} alt="Обложка фильма"/>
                    <div className="card__title">
                        <h3 className="card__text">33 слова о дизайне</h3>
                        <button type="submit" className='card__dislike-button'></button>                    
                    </div>
                    <p className="card__time">1ч42м</p>
                </div>
                <div className="card">
                    <img className="card__image" src={film3} alt="Обложка фильма"/>
                    <div className="card__title">
                        <h3 className="card__text">33 слова о дизайне</h3>
                        <button type="submit" className='card__dislike-button'></button>                    
                    </div>
                    <p className="card__time">1ч42м</p>
                </div>
            </div>
        </section>
    );
}

export default SavedFilms;