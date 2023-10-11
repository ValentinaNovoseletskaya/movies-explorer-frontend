import './Profile.css';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Profile({user}) {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email
  });

 useEffect(() => {
  setFormValue({
      name: user ? user.name : '',
      email: user ? user.email : '',
  }) 
}, [user]);
  

  function handleEditClick(e) {
    e.preventDefault();
    setIsEditProfile(true);
  }

  function handleSaveClick(e) {
    e.preventDefault();
    setIsEditProfile(false);
  }

    return (
        <main className="profile">
            <h2 className="profile__welcome">Привет, {user.name}!</h2>
            <form className="profile__form">
                <div className="profile__name  profile__name_underlined">
                    <label className="profile__input-name">Имя</label>
                    <input className="profile__input" id="name" name="name" type="text" placeholder="" value={formValue.name || '' }
                    onChange={ e=>{
                        setFormValue({...formValue, name: e.target.value})
                    } } />
                </div>
                <div className="profile__name">
                    <label className="profile__input-name">E-mail</label>
                    <input className="profile__input" id="email" name="email" type="email" placeholder="" value={formValue.email || '' }
                    onChange={ e=>{
                    setFormValue({...formValue, email: e.target.value})
                    } } />
                </div>
                { isEditProfile ? 
                  <button type="submit" className='profile__save-button' onClick={handleSaveClick}>Сохранить</button>
                  :
                  <button type="submit" className='profile__edit-button' onClick={handleEditClick}>Редактировать</button>
                }
            </form>
            { !isEditProfile && <Link to="/" className="profile__link">Выйти из аккаунта</Link> }
        </main>
    );
}

export default Profile;