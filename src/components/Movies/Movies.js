import './Movies.css';
import { useRef, useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import Preloader from '../Preloader/Preloader';
import Movie from '../Movie/Movie';
import Search from '../Search/Search';

function Movies({isLoading, movies, searchHistory, handleGetMovies}) { 
    const location = useLocation();
    const isSavedPage = location.pathname === "/saved-movies";

    const [keyword, setKeyword] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [visibleCards, setVisibleCards] = useState(4);
    const [moviesInRow, setMoviesInRow] = useState(4);
    const moviesContainerRef = useRef({});
    const movieCardRef = useRef({});

     


    // useEffect(() => {
    //     const handleResize = () => {
    //         if (movieCardRef.current) {
    //             const containerWidth = moviesContainerRef.current.offsetWidth;
    //             const movieCardWidth = movieCardRef.current.offsetWidth;

    //             const newMoviesInRow = Math.floor(containerWidth / (movieCardWidth + 20));
    //             setMoviesInRow(newMoviesInRow);
 
                

    //             if (window.innerWidth >= 480 ) { 
    //                 const newVisibleCards = Number(visibleCards + moviesInRow);
    //                 setVisibleCards(newVisibleCards)
    //                 console.log(newVisibleCards)
    //             } else if (window.innerWidth <= 480) {
    //                 const newVisibleCards = Number(visibleCards + 2);
    //                 setVisibleCards(newVisibleCards)
    //                 console.log(newVisibleCards)
    //             }
                
    //         } 
    //     };
     
    //     window.addEventListener('resize', handleResize);
     
    //     handleResize();
     
    //     return () => {
    //       window.removeEventListener('resize', handleResize);
    //     };
    //   }, []);

    useEffect(() => {
        const results = searchFilter(movies, keyword); 
        setSearchResults(results);
     }, [movies, keyword]);
     
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

    function loadMoreMovies(){ 
            setVisibleCards(visibleCards + moviesInRow)
      };
      
    return (
        <main>
            <Search movies={movies} handleInputChange={handleInputChange} searchHistory={searchHistory} />
            <section className="movies">
           
            {isLoading ? (
                <Preloader/>
                ) : error ? (
                <div className="error-message">{error}</div>
                ) : searchResults.length === 0 ? (
                <div className="no-results">Ничего не найдено</div>
                ) : (
                <>
                     <div className="movies__container" ref={moviesContainerRef}>
                        {searchResults.slice(0, visibleCards).map((movie) => (
                            <Movie movieCardRef={movieCardRef} movie={movie}/>   
                        ))}              
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