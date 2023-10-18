import './Movies.css';
import { useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import Preloader from '../Preloader/Preloader';
import Movie from '../Movie/Movie';
import Search from '../Search/Search';

function Movies({isLoading, movies, savedMovies, handleGetMovies, handleAddMovie, handleDeleteMovie}) { 
    const location = useLocation();
    const isSavedPage = location.pathname === "/saved-movies";

    const [keyword, setKeyword] = useState('');
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [visibleCards, setVisibleCards] = useState(0);
    const [moviesInRow, setMoviesInRow] = useState(0);
 
    

    useEffect(() => {
        const savedShortMovie = localStorage.getItem('shortMovie');
        const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
        
        if (savedShortMovie) {
            setIsShortMovies(savedShortMovie === 'true');
        }
    
        if (savedSearchResults) {
            setSearchResults(savedSearchResults);
        }
      }, []);

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
        if (movies.length > 0 && keyword !== '') {
            const results = searchFilter(movies, keyword); 
            setSearchResults(results);
            calculatePageRow();
            localStorage.setItem('searchResults', JSON.stringify(results));
        } 
     }, [movies, keyword]);
     
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
    function handleInputChange(keyword) {
       
        setError(null);
        setKeyword(keyword);
        handleSearchChange();
    }

    function handleSearchChange() {
        try {
            if (movies.length<1) {
                handleGetMovies();
            }
            
        } catch (error) {
            setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        }
    }
    function searchFilter(movieArray, keyword) {
 
        return movieArray.filter((movieCard) => {
          return movieCard.nameRU.toLowerCase().includes(keyword.toLowerCase().trim()) ||
                 movieCard.nameEN.toLowerCase().includes(keyword.toLowerCase().trim());
        }); 
    }
    function handleShortChange() { 
        const newState = !isShortMovies;
        setIsShortMovies(newState);
        localStorage.setItem('shortMovie', newState);
 
    }

    function loadMoreMovies(){ 
            setVisibleCards(visibleCards + moviesInRow)
      };
 
      
    return (
        <main>
            <Search isShortMovies={isShortMovies} handleShortChange={handleShortChange} handleInputChange={handleInputChange}  />
            <section className="movies">
           
            {isLoading ? (
                <Preloader/>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : isSavedPage ? (
                    <>
                    <div className="movies__container" >
                       {savedMovies.map((movie) => (
                           <Movie key={movie.movieId} movie={movie} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie}/>   
                       ))}              
                   </div> 
                    </>
                ) : searchResults.length === 0 ? (
                    <div className="no-results">Ничего не найдено</div>
                ) : (
                <>
                     <div className="movies__container" >
                        {searchResults.slice(0, visibleCards).map((movie) => {
                            const isSaved = savedMovies.some(savedmovie => savedmovie.movieId === movie.movieId); 
                            return <Movie key={movie.movieId} movie={movie} isSaved={!isSaved} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie}/>   
                        })}              
                    </div>
                    {searchResults.length > visibleCards && (
                        <div className="movies__add-block">
                            <button type="submit" className="movies__add-button" onClick={loadMoreMovies} >Ещё</button>
                        </div> 
                    )}
                </>
                )}

                 
            </section>
        </main>
    );
}

export default Movies;