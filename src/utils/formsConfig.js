export const inputSignup = [
    {
        labelclassName: 'signup__input-name',
        className: 'signup__input',
        type: 'text',
        placeholder: 'Имя',
        name: 'name',
        minLength: '3',
        maxLength: '40',
        required: true,
    },
    {   
        labelclassName: 'signup__input-name',
        className: 'signup__input',
        type: 'email',
        placeholder: 'E-mail',
        name: 'email', 
        required: true,
    },
    {
        labelclassName: 'signup__input-name',
        className: 'signup__input',
        type: 'password',
        placeholder: 'Пароль',
        name: 'password',
        minLength: '6',
        maxLength: '18',
        required: true,
    },
]

  
export const inputLogin = [
    {
        labelclassName: 'login__input-name',
        className: 'login__input',
        type: 'email',
        placeholder: 'E-mail',
        name: 'email', 
        required: true,
    },
    {   
        labelclassName: 'login__input-name',
        className: 'login__input',
        type: 'password',
        placeholder: 'Пароль',
        name: 'password',
        minLength: '6',
        maxLength: '18',
        required: true,
    },
]


  
export const inputProfile = [
    {
        underclassName: 'profile__name profile__name_underlined',
        labelclassName: 'profile__input-name',
        className: 'profile__input',
        type: 'text',
        placeholder: 'Имя',
        name: 'name',
        minLength: '3',
        maxLength: '40',
        required: true,
    },
    {
        underclassName: 'profile__name',
        labelclassName: 'profile__input-name',
        className: 'profile__input',
        type: 'email',
        placeholder: 'E-mail',
        name: 'email', 
        required: true,
    }
]