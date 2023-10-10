import './Movie.css';

function Movie({film}) {


    return (
                <div className="card">
                    <img className="card__image" src={film} alt="Обложка фильма"/>
                    <div className="card__title">
                        <h3 className="card__text">33 слова о дизайне</h3>
                        <button type="submit" className='card__like-button'></button>                    
                    </div>
                    <p className="card__time">1ч42м</p>
                </div>
    );
}

export default Movie;