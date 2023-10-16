import './Search.css';
import {useState, useEffect} from 'react';

function Search( {movies, setMovies, handleGetMovies, searchHistory}) {

  const [keyword, setKeyword] = useState(null);
  const [findShorts, setFindShorts] = useState(false);

  useEffect(() => {
    handleGetMovies();
 }, []);

  function searchFilter(movieArray, keyword) {
 
      return movieArray.filter((movieCard) => {
        return movieCard.nameRU.toLowerCase().includes(keyword.toLowerCase().trim());
      }); 
  }

 
  function handleClickSearch(e){
    e.preventDefault();
    
    if (keyword) {
      setMovies(searchFilter(movies, keyword)); 
    
    }
    
     
  }
  function handleChange(e) {
    setFindShorts(!findShorts);
  }

    return (
        <section className="search">
          <form className="search__form">
            <input className="search__input" id="search" name="search" type="text" placeholder="Фильм" value={keyword || '' } onChange={ e=>{setKeyword(e.target.value)}}/>
            <button type="submit" className='search__button' onClick={handleClickSearch} ></button>
          </form>      
          <div className="search__shorts">
            <input type="checkbox" className='search__shorts-button' onChange={handleChange} checked={findShorts} />
            <p className="search__shorts-text">Короткометражки</p>              
          </div>
        </section>
    );
}

export default Search;