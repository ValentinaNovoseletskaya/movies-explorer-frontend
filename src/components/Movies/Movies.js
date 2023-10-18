import './Movies.css';
import { useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import Preloader from '../Preloader/Preloader';
import Movie from '../Movie/Movie';
import Search from '../Search/Search';
import {searchFilter} from '../../utils/utils';

function Movies({isLoading, movies, savedMovies, handleGetMovies, handleAddMovie, handleDeleteMovie}) { 
    const location = useLocation();
    const isSavedPage = location.pathname === "/saved-movies";

    const [keyword, setKeyword] = useState('');
    const [savedKeyword, setSavedKeyword] = useState('');
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isSavedShortMovies, setIsSavedShortMovies] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [savedSearchResults, setSavedSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [visibleCards, setVisibleCards] = useState(0);
    const [moviesInRow, setMoviesInRow] = useState(0);
 
    

    useEffect(() => {
        const savedShortMovie = localStorage.getItem('shortMovie');
        const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
 
        if (savedShortMovie) {
            const isTrue = savedShortMovie === 'true'
            setIsShortMovies(isTrue);
        } else {
            setIsShortMovies(false);
        }
    
        if (savedSearchResults) {
            setSearchResults(savedSearchResults);
        } else {
            setSearchResults([]);
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
       if (movies.length > 0 ) {
            if (keyword === '') {
                setSearchResults([]);
                localStorage.removeItem('searchResults');
            } else {
                const results = searchFilter(movies, keyword, isShortMovies); 
                setSearchResults(results);
                calculatePageRow();
                localStorage.setItem('searchResults', JSON.stringify(results));
            }
        } 
     }, [movies, keyword, isShortMovies]);
    
    useEffect(() => { 
        handleSavedResultUpdate();
    }, [ savedMovies, savedKeyword, isSavedShortMovies]);
    
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
    function handleSavedInputChange(keyword) {
       
        setError(null);
        setSavedKeyword(keyword);
        handleSavedResultUpdate();
    }
    
    function handleShortChange(e) { 
        const newState = !isShortMovies;
        setIsShortMovies(newState);
        localStorage.setItem('shortMovie', newState);
        handleSearchChange();
 
    }

    function handleSavedShortChange(e) {
        const newState = !isSavedShortMovies;
        setIsSavedShortMovies(newState);
      }
      

    function handleSavedResultUpdate() {
        setSavedSearchResults([]);
        if (isSavedPage) {
            const results = searchFilter(savedMovies, savedKeyword, isSavedShortMovies); 
            setSavedSearchResults(results);
        }
    }
    function loadMoreMovies(){ 
            setVisibleCards(visibleCards + moviesInRow)
      };
    
    function handleSearchChange() {
        try {
            if (movies.length<1) {
                handleGetMovies();
            }
            
        } catch (error) {
            setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        }
    }
      
    return (
        <main>
            {isSavedPage ? (
                <Search isSavedPage={isSavedPage} isShortMovies={isSavedShortMovies} handleShortChange={handleSavedShortChange} handleInputChange={handleSavedInputChange}  />
            ) : (
                <Search isShortMovies={isShortMovies} handleShortChange={handleShortChange} handleInputChange={handleInputChange}  />
            )}
            <section className="movies">
            
            {isLoading ? (
                <Preloader/>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : isSavedPage ? (
                    <> 
                        { (savedKeyword !== ''|| isSavedShortMovies )&& savedSearchResults.length === 0 ? (
                            <div className="no-results">Ничего не найдено</div>
                        ) : savedSearchResults.length > 0 ? (
                            <>
                            <div className="movies__container" >
                                {savedSearchResults.map((movie) => (
                                    <Movie key={movie.movieId} movie={movie} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie}/>   
                                ))}              
                            </div> 
                            </>
                        ) 
                        :
                            <div className="movies__container" >
                            {savedMovies.map((movie) => (
                                <Movie key={movie.movieId} movie={movie} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie}/>   
                            ))}              
                        </div> 
                    }
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