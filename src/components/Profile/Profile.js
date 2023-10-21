import './Profile.css';
import { useState, useEffect, useContext } from 'react';
import { Link} from 'react-router-dom';
import { inputProfile } from '../../utils/formsConfig.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile({onLogout, onUpdate, updateError, updateSuccess, handleSetSuccess}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [userError, setUserError] = useState(false);
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


  useEffect(() => {
    console.log(formErrors);
    if (isEditProfile) {
      if (currentUser.name === formData.name && currentUser.email === formData.email){
        setUserError("Данные не изменились"); 
      } else {
        setUserError(false)
      }
    }
    // eslint-disable-next-line
  }, [currentUser, formData, isEditProfile]);

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
    } else if (currentUser === formData){ 
      setFormErrors({...formErrors, [name]: errorMessage || ''})
    }
    
  }
 
  function handleEditClick(e) {
    e.preventDefault();
    setIsEditProfile(true);
    handleSetSuccess();
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
     
      return formDataValues.length === 0 || userError || formDataValues.some(item => !item) || Object.values(formErrors).some(item => item)        
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
                                handleUserInput(e) 
                              } }
                            /> 
                          </div>
                          
                          <span className="signup__error" >{formErrors[name]}</span>
                          <span className="signup__error" >{formErrors.data}</span>
                          </> 
                        })}  
                  
                  { userError && <div class="authError">{userError}</div> }
                  { updateError && <div class="authError">{updateError}</div> }

                  { updateSuccess && <div class="updateSuccess">Данные успешно изменены</div> }



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