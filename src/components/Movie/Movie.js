import './Movie.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

function Movie({ movie, isSaved, handleAddMovie, handleDeleteMovie}) {
    
    const location = useLocation();
    const isSavedPage = location.pathname === "/saved-movies";
 
    const [isLiked, setIsLiked] = useState(false);

    
    function handleLikeClick() {
        if (isLiked) {
            handleDeleteMovie(movie);
        } else {
            handleAddMovie(movie);
        } 
    };
    function handleDisLikeClick() {
        handleDeleteMovie(movie); 
    };

    function formatDuration(minutes){
        const hours = Math.floor(minutes / 60) > 0 ? (`${Math.floor(minutes / 60)}ч`) : '';
        const remainingMinutes = minutes % 60;
    
        return `${hours}${remainingMinutes.toString().padStart(2, '0')}м`;
      };

      useEffect(() => { 
        setIsLiked(!isSaved);
         
    }, [isSaved]);
    return (
        <div className="movie"  >
            <Link className="movie__link" target="_blank" to={`${movie.trailerLink}`} ><img className="movie__image" src={`${movie.image} `} alt="Обложка фильма"/></Link>
            
            <div className="movie__title">
                <h3 className="movie__text">{movie.nameRU}</h3>
                {isSavedPage ? 
                    <button type="submit" className='movie__dislike-button' onClick={handleDisLikeClick}></button>
                    :
                    <button type="submit" className={`movie__like-button ${isLiked ? "movie__like-button_active": ""} `} onClick={handleLikeClick}></button>                    
                }
            </div>
            <p className="movie__time">{formatDuration(movie.duration)}</p>
        </div>
    );
}

export default Movie;