import { useCallback, useEffect, useState} from 'react'; 
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Search from '../Search/Search';
import { filterByKeyword, filterByIsShortMovies } from '../../utils/utils';

function SavedMovies({savedMovies, handleDeleteMovie}) { 
    const isSavedPage = true;
 
    const [isShortMovies, setIsShortMovies] = useState(false); 
    const [searchResults, setSearchResults] = useState([]); 
    const [displayMovies, setDisplayMovies] = useState([]); 
    const [error, setError] = useState(null);  

    const handleInputChange = useCallback( (keyword) => {   
        if (keyword !=''){ 
            const results = filterByKeyword(savedMovies, keyword); 
            setSearchResults(results);  
        } else { 
            setSearchResults(savedMovies);  
        }
    }, [savedMovies]);
  
    function handleShortChange(e) { 
        const newState = !isShortMovies;
        setIsShortMovies(newState); 
    }
 
    useEffect(() => { 
        if (searchResults.length !== 0) {
            if (isShortMovies) {
                const newMovies = filterByIsShortMovies(searchResults, setIsShortMovies);
                setDisplayMovies(newMovies);
            } else {
                setDisplayMovies(searchResults);
            }
        } else {
            if (isShortMovies) {
                const newMovies = filterByIsShortMovies(savedMovies, setIsShortMovies);
                setDisplayMovies(newMovies);
            } else {
                setDisplayMovies(savedMovies);
            }
            
        } 

         
    }, [savedMovies, searchResults, isShortMovies]);

 
 
  
      
    return (
        <main>
             
            <Search isShortMovies={isShortMovies} handleShortChange={handleShortChange} handleInputChange={handleInputChange} showOnlySaved={isSavedPage} />
             
            <MoviesCardList displayMovies={displayMovies} handleDeleteMovie={handleDeleteMovie} error={error} showOnlySaved={isSavedPage}/>
       
        </main>
    );
}

export default SavedMovies;