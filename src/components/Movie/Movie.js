import './Movie.css';
import {useState, useRef} from 'react'; 
import { useLocation } from "react-router-dom";

function Movie({movie, isSaved}) {
    const movieRef = useRef(null);
    const location = useLocation();
    const isSavedPage = location.pathname === "/saved-movies";
    const [isLiked, setIsLiked] = useState(false);
    function handleLikeClick() {
        setIsLiked(!isLiked);
    };
    function handleDisLikeClick() {
        movieRef.current.remove();
    };

    return (
        <div className="movie" ref={movieRef}  >
            <img className="movie__image" src={`https://api.nomoreparties.co${movie.thumbnail} `} alt="Обложка фильма"/>
            <div className="movie__title">
                <h3 className="movie__text">{movie.nameRU}</h3>
                {isSavedPage ? 
                    <button type="submit" className='movie__dislike-button' onClick={handleDisLikeClick}></button>
                    :
                    <button type="submit" className={`movie__like-button ${isLiked ? "movie__like-button_active": ""} `} onClick={handleLikeClick}></button>                    
                }
            </div>
            <p className="movie__time">{movie.duration}min</p>
        </div>
    );
}

export default Movie;