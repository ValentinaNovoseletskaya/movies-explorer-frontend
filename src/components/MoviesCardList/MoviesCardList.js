import '../Movies/Movies.css';
import { useEffect, useState} from 'react'; 
import Preloader from '../Preloader/Preloader';
import Movie from '../Movie/Movie'; 

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

        if (window.innerWidth >= 480 ) { 
            const newMoviesInRow = Math.floor(window.innerWidth / 320) > 4 ? 4 : Math.floor(window.innerWidth / 320);
            setMoviesInRow(newMoviesInRow);
            const newVisibleCards = Number(newMoviesInRow*4);
            setVisibleCards(newVisibleCards);
        } else if (window.innerWidth <= 480) {
            setMoviesInRow(2);
            const newVisibleCards = 5;
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