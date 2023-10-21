import './Signup.css';
import { useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { inputSignup } from '../../utils/formsConfig.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Signup({onSignup, authError}) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
 
  useEffect(() => {
    if(currentUser) {
      navigate('/movies');
    }
 }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  function handleUserInput(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const errorMessage = e.target.validationMessage;
    validateFields(name, value, errorMessage)
    
  }

  function validateFields(name, value, errorMessage){
    if (name === "email") {
      errorMessage = (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? false : 'E-mail должен быть в формате email@domain.name';
      setFormErrors({...formErrors, [name]: errorMessage || ''})
    } else { 
      setFormErrors({...formErrors, [name]: errorMessage || ''})
    }

  }

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
                handleUserInput(e) 
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