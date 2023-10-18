import './Login.css';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';
import {inputLogin} from '../../utils/formsConfig.js';

function Login({onLogIn, authError}) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});  

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
                    setFormData({...formData, [name]: e.target.value})
                    const errorMessage = e.target.validationMessage
                    setFormErrors({...formErrors, [name]: errorMessage || ''})
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