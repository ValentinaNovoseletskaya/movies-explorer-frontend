import './Movies.css';
import Movie from '../Movie/Movie';
import {moviesImages} from '../../utils/moviesImages';

 

function Movies() {


    return (
        <section className="films">
            <div className="cards">
                {moviesImages.map((movie) => (
                    <Movie film={movie}/> 
                ))}   
              
            </div>
            <div className="cards__add-block">
                <button type="submit" className="cards__add-button">Ещё</button>
            </div>
        </section>
    );
}

export default Movies;