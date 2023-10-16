import './Movies.css';
import Movie from '../Movie/Movie';
import Search from '../Search/Search';
import { useLocation } from "react-router-dom";

function Movies({movies, setMovies, searchHistory, handleGetMovies}) { 
    const location = useLocation();
    const isSavedPage = location.pathname === "/saved-movies";

 
   
    return (
        <main>
            <Search movies={movies} setMovies={setMovies} handleGetMovies={handleGetMovies} searchHistory={searchHistory} />
            <section className="movies">
                <div className="movies__container">
                    {movies.map((movie) => (
                        <Movie  movie={movie}/>    
                    ))}              
                </div>
                {!isSavedPage ? 
                    <div className="movies__add-block">
                        <button type="submit" className="movies__add-button" >Ещё</button>
                    </div>
                    :
                    ''
                }
            </section>
        </main>
    );
}

export default Movies;