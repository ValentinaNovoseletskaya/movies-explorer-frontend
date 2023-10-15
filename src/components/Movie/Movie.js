import './Movie.css';
import {useState, useRef} from 'react'; 
import { useLocation } from "react-router-dom";

function Movie({film, isSaved}) {
    const filmRef = useRef(null);
    const location = useLocation();
    const isSavedPage = location.pathname === "/saved-movies";
    const [isLiked, setIsLiked] = useState(false);
    function handleLikeClick() {
        setIsLiked(!isLiked);
    };
    function handleDisLikeClick() {
        filmRef.current.remove();
    };

    return (
        <div className="movie" ref={filmRef}>
            <img className="movie__image" src={film} alt="Обложка фильма"/>
            <div className="movie__title">
                <h3 className="movie__text">33 слова о дизайне</h3>
                {isSavedPage ? 
                    <button type="submit" className='movie__dislike-button' onClick={handleDisLikeClick}></button>
                    :
                    <button type="submit" className={`movie__like-button ${isLiked ? "movie__like-button_active": ""} `} onClick={handleLikeClick}></button>                    
                }
            </div>
            <p className="movie__time">1ч42м</p>
        </div>
    );
}

export default Movie;