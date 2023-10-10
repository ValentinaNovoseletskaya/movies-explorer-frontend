import './Movies.css';
import Movie from '../Movie/Movie';

function Movies({movies}) { 
   
    return (
        <main className="films">
            <div className="movies">
                {movies.map((movie) => (
                    <Movie film={movie}/> 
                ))}              
            </div>
            <div className="movies__add-block">
                <button type="submit" className="movies__add-button">Ещё</button>
            </div>
        </main>
    );
}

export default Movies;