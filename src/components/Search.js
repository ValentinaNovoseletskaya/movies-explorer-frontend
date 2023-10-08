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

    return (
        <section className="search">
          <form className="search__form" onSubmit={handleSubmit}>
            <input className="search__input" id="search" name="search" type="name" placeholder="Фильм" value="" onChange="" />
            <button type="submit" className='search__button'></button>
          </form>      
          <div className="search__shorts">
            <button type="submit" className='search__shorts-button'></button>
            <p className="search__shorts-text">Короткометражки</p>              
          </div>
        </section>
    );
}

export default Search;