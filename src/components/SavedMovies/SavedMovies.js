import { useCallback, useEffect, useState} from 'react'; 
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Search from '../Search/Search';
import { filterByKeyword, filterByIsShortMovies } from '../../utils/utils';

function SavedMovies({savedMovies, handleDeleteMovie}) { 
    const isSavedPage = true;
    
    const [queryWord, setQueryWord] = useState(''); 
    const [isShortMovies, setIsShortMovies] = useState(false); 
    const [searchResults, setSearchResults] = useState([]); 
    const [displayMovies, setDisplayMovies] = useState([]);  

    const handleInputChange = useCallback( (keyword) => {   
        if (keyword !==''){ 
            setQueryWord(keyword);
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
        if (queryWord !==''){  
            const results = filterByKeyword(savedMovies, queryWord); 
            setSearchResults(results);  
        } else { 
            setSearchResults(savedMovies);  
        }
    }, [savedMovies, queryWord]);

    useEffect(() => { 
        if (searchResults.length !== 0) {
            if (isShortMovies) {
                const newMovies = filterByIsShortMovies(searchResults, setIsShortMovies);
                setDisplayMovies(newMovies);
            } else {
                setDisplayMovies(searchResults);
            }
        } else {
            setDisplayMovies([]);
        } 
    }, [searchResults, isShortMovies, queryWord]);
      
    return (
        <main>
            <Search isShortMovies={isShortMovies} handleShortChange={handleShortChange} handleInputChange={handleInputChange} showOnlySaved={isSavedPage} />
            <MoviesCardList displayMovies={displayMovies} handleDeleteMovie={handleDeleteMovie} showOnlySaved={isSavedPage}/>
        </main>
    );
}

export default SavedMovies;