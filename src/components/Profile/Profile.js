import './Profile.css';
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { inputProfile } from '../../utils/formsConfig.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile({onLogout, onUpdate, updateError}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email
  });

  useEffect(() => {
    setFormData({
      name: currentUser ? currentUser.name : '',
      email: currentUser ? currentUser.email : '',
    }) 
  }, [currentUser]);
  

  function handleEditClick(e) {
    e.preventDefault();
    setIsEditProfile(true);
  }

  function handleSaveClick(e) {
    e.preventDefault();
    setIsEditProfile(false);
    onUpdate({
      name: formData.name,
      email: formData.email,
    });
  }
 
  const formDataValues = Object.values(formData);
  const isDisabled = () => {
     
      return formDataValues.length === 0 || formDataValues.some(item => !item) || Object.values(formErrors).some(item => item)        
  }
    return (
        <main className="profile">
            <h2 className="profile__welcome">Привет, {currentUser.name}!</h2>
            <form className="profile__form">
    
 
                {inputProfile.map( ({underclassName, labelclassName, type, required, name, className, placeholder, minLength, maxLength}) => {
                          return <><div   className={underclassName} key={name}>
                            <label className={labelclassName}>{placeholder}</label>
                            <input 
                              disabled={!isEditProfile} 
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
                          </div>
                          
                          <span className="signup__error" >{formErrors[name]}</span>
                          </> 
                        })}  
                  { updateError && <div class="authError">{updateError}</div> }



                { isEditProfile ? 
                  <button  disabled={isDisabled()}  type="submit" className='profile__save-button' onClick={handleSaveClick}>Сохранить</button>
                  :
                  <button  type="submit" className='profile__edit-button' onClick={handleEditClick}>Редактировать</button>
                }
            </form>
            { !isEditProfile && <Link to="/" className="profile__link" onClick={onLogout}>Выйти из аккаунта</Link> }
        </main>
    );
}

export default Profile;