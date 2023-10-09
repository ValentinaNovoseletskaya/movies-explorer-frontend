import {useState} from 'react';

function Search({onLogIn}) {
  const [formValue] = useState({
    email: '',
    password: ''
  })
 
  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    onLogIn({
        email: formValue.email,
        password: formValue.password,
    });
  }

  const [findShorts, setFindShorts] = useState(false); 

  function handleChange(e) {
    setFindShorts(!findShorts);
  }

    return (
        <section className="search">
          <form className="search__form" onSubmit={handleSubmit}>
            <input className="search__input" id="search" name="search" type="name" placeholder="Фильм"/>
            <button type="submit" className='search__button'></button>
          </form>      
          <div className="search__shorts">
            <input type="checkbox" className='search__shorts-button' onChange={handleChange} checked={findShorts} />
            <p className="search__shorts-text">Короткометражки</p>              
          </div>
        </section>
    );
}

export default Search;