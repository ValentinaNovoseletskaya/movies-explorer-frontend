import './Movies.css';
import Movie from '../Movie/Movie';
import Search from '../Search/Search';

function Movies({movies}) { 
   
    return (
        <main>
            <Search />
            <section className="films">
                <div className="movies">
                    {movies.map((movie) => (
                        <Movie film={movie}/> 
                    ))}              
                </div>
                <div className="movies__add-block">
                    <button type="submit" className="movies__add-button">Ещё</button>
                </div>
            </section>
        </main>
    );
}

export default Movies;