import './Profile.css';
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile({onLogout, onUpdate}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfile, setIsEditProfile] = useState(false);
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

    return (
        <main className="profile">
            <h2 className="profile__welcome">Привет, {currentUser.name}!</h2>
            <form className="profile__form">
                <div className="profile__name  profile__name_underlined">
                    <label className="profile__input-name">Имя</label>
                    <input className="profile__input" id="name" name="name" type="text" placeholder="Имя" value={formData.name || '' }
                    onChange={ e=>{
                        setFormData({...formData, name: e.target.value})
                    } } />
                </div>
                <div className="profile__name">
                    <label className="profile__input-name">E-mail</label>
                    <input className="profile__input" id="email" name="email" type="email" placeholder="E-mail" value={formData.email || '' }
                    onChange={ e=>{
                    setFormData({...formData, email: e.target.value})
                    } } />
                </div>
                { isEditProfile ? 
                  <button type="submit" className='profile__save-button' onClick={handleSaveClick}>Сохранить</button>
                  :
                  <button type="submit" className='profile__edit-button' onClick={handleEditClick}>Редактировать</button>
                }
            </form>
            { !isEditProfile && <Link to="/" className="profile__link" onClick={onLogout}>Выйти из аккаунта</Link> }
        </main>
    );
}

export default Profile;