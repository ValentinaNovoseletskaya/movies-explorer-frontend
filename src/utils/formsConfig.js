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