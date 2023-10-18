import './Search.css';
import {useState, useEffect} from 'react';

function Search({ isSavedPage, isShortMovies, handleShortChange, handleInputChange }) {

  const [keyword, setKeyword] = useState('');
  useEffect(() => {

    if (!isSavedPage) {
      const savedSearchText = localStorage.getItem('searchText'); 

      if (savedSearchText) {
          setKeyword(savedSearchText);
      }
    }

  }, [isSavedPage]);

  function handleClickSearch(e){
    e.preventDefault();
     
      handleInputChange(keyword);
      if (!isSavedPage) {
        localStorage.setItem('searchText', keyword);
      } 
  
  }
 

    return (
        <section className="search">
          <form className="search__form">
            <input className="search__input" id="search" name="search" type="text" placeholder="Фильм" value={keyword || '' } onChange={ e=>{setKeyword(e.target.value)}}/>
            <button type="submit" className='search__button' onClick={handleClickSearch} ></button>
          </form>      
          <div className="search__shorts">
            <input type="checkbox" className='search__shorts-button' onChange={handleShortChange} checked={isShortMovies} />
            <p className="search__shorts-text">Короткометражки</p>              
          </div>
        </section>
    );
}

export default Search;