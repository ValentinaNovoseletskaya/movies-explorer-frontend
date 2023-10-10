import './Movie.css';
import {useState} from 'react';

function Movie({film}) {

    const [isLiked, setIsLiked] = useState(false);
    function handleLikeClick() {
        setIsLiked(!isLiked);
    };
    

    return (
        <div className="movie">
            <img className="movie__image" src={film} alt="Обложка фильма"/>
            <div className="movie__title">
                <h3 className="movie__text">33 слова о дизайне</h3>
                <button type="submit" className={`movie__like-button ${isLiked ? "movie__like-button_active": ""} `} onClick={handleLikeClick}></button>                    
            </div>
            <p className="movie__time">1ч42м</p>
        </div>
    );
}

export default Movie;