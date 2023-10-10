import './Signup.css';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.png';

function Signup({onSignup}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    onSignup({
      email: formValue.email,
      password: formValue.password,
    });
  }

  return (
    <main className="sign">
      <Link to="/"><img className="logo" src={logo} alt="Логотип" /></Link>
      <p className="sign__welcome">Добро пожаловать!</p>
      <form className="sign__form" onSubmit={handleSubmit}>
        <fieldset className="sign__inputs">
          <label className="sign__input-name">Имя</label>
          <input className="sign__input" id="name" name="name" type="name" placeholder="" value={formValue.name || '' }
          onChange={ e=>{
            setFormValue({...formValue, name: e.target.value})
          } } />
          <label className="sign__input-name">E-mail</label>
          <input className="sign__input" id="email" name="email" type="email" placeholder="" value={formValue.email || '' }
          onChange={ e=>{
            setFormValue({...formValue, email: e.target.value})
          } } />
          <label className="sign__input-name">Пароль</label>
          <input className="sign__input" id="password" name="password" type="password" placeholder="" value={formValue.password || '' }
          onChange={ e=>{
            setFormValue({...formValue, password: e.target.value})
          } } />
        </fieldset>
        <button type="submit" className='save-button sign__button'>Зарегистрироваться</button>
      </form>      
      <div className="sign__login">
        <p className="sign__login-text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/signin" className="sign__link">Войти</Link>
      </div>
    </main>
  );
}

export default Signup;