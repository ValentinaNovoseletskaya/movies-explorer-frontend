import {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';

function Login({onLogIn}) {
  const [formValue, setFormValue] = useState({
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
        <section className="sign">
          <img className="logo" src={logo} alt="Логотип" />
          <p className="sign__welcome">Рады видеть!</p>
          <form className="sign__form" onSubmit={handleSubmit}>
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
              <button type="submit" className='save-button sign__button'>Войти</button>
          </form>      
          <div className="sign__login">
              <p className="sign__login-text">Еще не зарегистрированы?&nbsp;</p>
              <Link to="/signup" className="sign__link">Регистрация</Link>
          </div>
        </section>
    );
}

export default Login;