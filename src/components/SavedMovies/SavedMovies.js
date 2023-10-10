import Movies from '../Movies/Movies';

function SavedMovies({movies}) {
    const savedMovies = movies.slice(0, 3);
    return (          
            <Movies movies={savedMovies}/>  
            );
}

export default SavedMovies;