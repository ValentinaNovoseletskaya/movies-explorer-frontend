import './MoviesCardList.css';
import { useEffect, useState} from 'react'; 
import Preloader from '../Preloader/Preloader';
import Movie from '../Movie/Movie'; 
import { SMALL_WINDOWS, CARD_WIDTH, CARD_IN_ROW_LIMIT, CARD_SMALL_IN_ROW_LIMIT, CARD_SMALL_VISIBLE_LIMIT } from '../../utils/constants';

function MoviesCardList({isLoading, displayMovies, savedMovies, handleAddMovie, handleDeleteMovie, error, showOnlySaved}) { 
   
    const [visibleCards, setVisibleCards] = useState(0);
    const [moviesInRow, setMoviesInRow] = useState(0); /// cardsTohow
 
     

    useEffect(() => {
        let timeoutId;
        const handleResize = () => { 
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                calculatePageRow();  
            }, 200);

        };
     
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
          };
      }, []);

    useEffect(() => {
        calculatePageRow();
     }, [displayMovies]);
     
    
    function calculatePageRow() {

        if (window.innerWidth >= SMALL_WINDOWS ) { 
            const newMoviesInRow = Math.floor(window.innerWidth / CARD_WIDTH) > CARD_IN_ROW_LIMIT ? CARD_IN_ROW_LIMIT : Math.floor(window.innerWidth / CARD_WIDTH);
            setMoviesInRow(newMoviesInRow);
            const newVisibleCards = Number(newMoviesInRow*4);
            setVisibleCards(newVisibleCards);
        } else if (window.innerWidth <= SMALL_WINDOWS) {
            setMoviesInRow(CARD_SMALL_IN_ROW_LIMIT);
            const newVisibleCards = CARD_SMALL_VISIBLE_LIMIT;
            setVisibleCards(newVisibleCards);
        }
    } 
     
 
    function loadMoreMovies(){ 
            setVisibleCards(visibleCards + moviesInRow)
      };
     
      
    return (
      
            <section className="movies">
            
            {isLoading ? (
                <Preloader/>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : displayMovies.length === 0 ? (
                    <div className="no-results">Ничего не найдено</div>
                ) : showOnlySaved ? (
                    <> 
                        <div className="movies__container" >
                            {displayMovies.map((movie) => (
                                <Movie key={movie.movieId} movie={movie} handleDeleteMovie={handleDeleteMovie}/>   
                            ))}              
                        </div> 
                    </>
                ) : (
                <>
                     <div className="movies__container" >
                        {displayMovies.slice(0, visibleCards).map((movie) => {
                            const isSaved = savedMovies.some(savedmovie => savedmovie.movieId === movie.movieId); 
                            return <Movie key={movie.movieId} movie={movie} isSaved={!isSaved} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie}/>   
                        })}              
                    </div>
                    {displayMovies.length > visibleCards && (
                        <div className="movies__add-block">
                            <button type="submit" className="movies__add-button" onClick={loadMoreMovies} >Ещё</button>
                        </div> 
                    )}
                </>
                )}

                 
            </section> 
    );
}

export default MoviesCardList;