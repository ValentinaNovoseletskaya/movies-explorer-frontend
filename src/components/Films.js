import {useState} from 'react';
import find from "../images/find.png";
import smalltumb from "../images/smalltumb.png";

function Films({onLogIn}) {
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
        <section className="films">
          <form className="films__form" onSubmit={handleSubmit}>
            <input className="films__input" id="films" name="films" type="name" placeholder="Фильм" value="" onChange="" />
            <button type="submit" className='films__button'><img className="find" src={find} alt="Поиск" /></button>
          </form>      
          <div className="films__shorts">
            <button type="submit" className='films__shorts-button'><img className="tumb" src={smalltumb} alt="Переключатель" /></button>
            <p className="films__shorts-text">Короткометражки</p>              
          </div>
          <div className="cards">
            <div className="card">
                <img className="card__image" alt="Обложка фильма"/>
                <p className="card__text"></p>
                <img className="card__like" alt="Точка"/>
            </div>
          </div>
        </section>
    );
}

export default Films;