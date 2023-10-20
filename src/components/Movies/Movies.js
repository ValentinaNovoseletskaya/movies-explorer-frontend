import { useCallback, useEffect, useState} from 'react'; 
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Search from '../Search/Search';
import { filterByKeyword, filterByIsShortMovies } from '../../utils/utils';

 
function Movies({isLoading, savedMovies, handleGetMovies, handleAddMovie, handleDeleteMovie}) { 
 
    const [movies, setMovies] = useState([]); 
    const [isShortMovies, setIsShortMovies] = useState(false); 
    const [searchResults, setSearchResults] = useState([]); 
    const [displayMovies, setDisplayMovies] = useState([]); 
    const [error, setError] = useState(null);  

    const handleInputChange = useCallback(async (keyword) => {   
        setError(null); 
        try {  
            if (movies.length === 0) {
                const newMovies = await handleGetMovies();
                setMovies(newMovies);
                handleSearchUpdate(newMovies, keyword);
            } else {
                handleSearchUpdate(movies, keyword);
            }
                
        } catch (error) {
            console.log(error);
            setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
        } 
    }, [movies]);
 
    function handleSearchUpdate(movies, keyword) {  
        if (keyword !=''){ 
            const results = filterByKeyword(movies, keyword); 
            setSearchResults(results); 
            localStorage.setItem('searchResults', JSON.stringify(results)); 
        } else { 
            setSearchResults([]); 
            localStorage.removeItem('searchResults'); 
        }
 
    }

    function handleShortChange(e) { 
        const newState = !isShortMovies;
        setIsShortMovies(newState);
        localStorage.setItem('shortMovie', newState);  
    }
 
    useEffect(() => {
        
        if (isShortMovies) {
            const newMovies = filterByIsShortMovies(searchResults, setIsShortMovies);
            setDisplayMovies(newMovies);
        } else {
            setDisplayMovies(searchResults);
        }
         
    }, [searchResults, isShortMovies]);

    useEffect(() => {
        const savedShortMovie = localStorage.getItem('shortMovie');
        const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
        if (savedShortMovie) {
            const isTrue = savedShortMovie === 'true'
            setIsShortMovies(isTrue);
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
            }, 200);

        };
     
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
          };
      }, []);      
    return (
        <main>
             <Search isShortMovies={isShortMovies} handleShortChange={handleShortChange} handleInputChange={handleInputChange}  />
            
             <MoviesCardList isLoading={isLoading} displayMovies={displayMovies} savedMovies={savedMovies} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie} error={error}/>
        </main>
    );
}

export default Movies;