import './SavedMovies.css';
import Movie from '../Movie/Movie';
import {moviesImages} from '../../utils/moviesImages';

function SavedMovies() {
    const savedMovies = moviesImages.slice(0, 3);
    return (         
        <section className="films">
            <div className="cards">
                {savedMovies.map((movie) => (
                    <Movie film={movie}/> 
                ))}
            </div>
        </section>
    );
}

export default SavedMovies;