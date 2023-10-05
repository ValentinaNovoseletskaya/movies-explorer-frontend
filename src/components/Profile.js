import {useState} from 'react';
import {Link} from 'react-router-dom';

function Profile({onLogIn}) {
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
        <section className="profile">
            <p className="profile__welcome">Привет!</p>
            <form className="profile__form" onSubmit={handleSubmit}>
                <div className="profile__name  profile__name_type_underlined">
                    <label className="profile__input-name">Имя</label>
                    <input className="profile__input" id="name" name="name" type="name" placeholder="" value={formValue.name || '' }
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
                <button type="submit" className='save-button profile__button'>Редактировать</button>
            </form>
            <Link to="/" className="profile__link">Выйти из аккаунта</Link>
        </section>
    );
}

export default Profile;