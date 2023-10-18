import './Signup.css';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import {inputSignup} from '../../utils/formsConfig.js';

function Signup({onSignup, authError}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password){
      return;
    }
    onSignup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  }

  const formDataValues = Object.values(formData);
  const isDisabled = () => {
     
      return formDataValues.length === 0 || formDataValues.some(item => !item) || Object.values(formErrors).some(item => item)        
  }

  return (
    <main className="signup">
      <Link to="/"><img className="signup__logo" src={logo} alt="Логотип" /></Link>
      <h2 className="signup__welcome">Добро пожаловать!</h2>
      <form className="signup__form" onSubmit={handleSubmit} >
        <fieldset className="signup__inputs">
        {inputSignup.map( ({labelclassName, type, required, name, className, placeholder, minLength, maxLength}) => {
          return  <div key={name}>
            <label className={labelclassName}>{placeholder}</label>
            <input 
              className={className}
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              required={required}
              minLength={minLength}
              maxLength={maxLength}
              value={formData[name] || '' }
              onChange={ e=>{
                setFormData({...formData, [name]: e.target.value})
                const errorMessage = e.target.validationMessage
                setFormErrors({...formErrors, [name]: errorMessage || ''})
              } }
            /> 
            <span className="signup__error" >{formErrors[name]}</span>
          </div>
        })} 
        </fieldset>
        { authError && <div class="authError">Пользователь с такой почтой уже зарегистрирован</div> }
        <button disabled={isDisabled()} type="submit" className='signup__save-button signup__button'>Зарегистрироваться</button>
      </form>      
      <div className="signup__login">
        <p className="signup__login-text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/signin" className="signup__link">Войти</Link>
      </div>
    </main>
  );
}

export default Signup;