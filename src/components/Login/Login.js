import './Login.css';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { inputLogin } from '../../utils/formsConfig.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Login({onLogIn, authError}) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
 
  useEffect(() => {
    if(currentUser) {
      navigate('/movies');
    }
 }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
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
    onLogIn({
        email: formData.email,
        password: formData.password,
    });
  }

  const formDataValues = Object.values(formData);
  const isDisabled = () => {
     
      return formDataValues.length === 0 || formDataValues.some(item => !item) || Object.values(formErrors).some(item => item)        
  }


    return (
        <main className="login">
          <Link to="/"><img className="login__logo" src={logo} alt="Логотип" /></Link>
          <h2 className="login__welcome">Рады видеть!</h2>
          <form className="login__form" onSubmit={handleSubmit}>
            <fieldset className="login__inputs">
            {inputLogin.map( ({labelclassName, type, required, name, className, placeholder, minLength, maxLength}) => {
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
                <span className="login__error" >{formErrors[name]}</span>
              </div>
            })} 
            </fieldset>
            { authError && <div class="authError">Некорректно введены почта или пароль</div> }
            <button disabled={isDisabled()}  type="submit" className='login__button'>Войти</button>
          </form>      
          <div className="login__signup">
              <p className="login__signup-text">Еще не зарегистрированы?&nbsp;</p>
              <Link to="/signup" className="login__link">Регистрация</Link>
          </div>
        </main>
    );
}

export default Login;