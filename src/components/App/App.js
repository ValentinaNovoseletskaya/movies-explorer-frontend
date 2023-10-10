// import {api} from '../utils/Api.js';
import {useEffect, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
// import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import Signup from '../Signup/Signup.js';
import Login from '../Login/Login.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';
import Profile from '../Profile/Profile.js';
import Search from '../Search/Search.js';
import Films from '../Films/Films.js';
import SavedFilms from '../SavedFilms/SavedFilms.js';
import Popup from '../Popup/Popup.js';
import {userData} from '../../utils/userData.js'
// import ProtectedRoute from './ProtectedRoute.js';

function App() {
    // const [useLoggedInToken, setUseLoggedInToken] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [selectedCard, setSelectedCard] = useState(null);
//     const [toDeleteCard, setToDeleteCard] = useState(null);
    const [currentUser, setCurrentUser] = useState('');
//     const [currentUserEmail, setCurrentUserEmail] = useState(null);
//     const [cards, setCards] = useState([]);
//     const [useLoggedInToken, setUseLoggedInToken] = useState(false);
//     const navigate = useNavigate();
//     const [isSignupSuccess, setIsSignupSuccess] = useState(false);
//     const [isAuthFail, setIsAuthFail] = useState(false);

// useEffect(() => {
//     setUseLoggedInToken(true);
// }, []);
//     useEffect(() => {
//        if(useLoggedInToken) {
//         api.getAppInfo()
//             .then(([userData, initialCards]) => {
//                 setCards(initialCards);
//                 setCurrentUser(userData);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//         }
//     }, [useLoggedInToken]);

    useEffect(() => {
        setCurrentUser(userData);
     }, []);

    function handleMenuClick() {
        setIsMenuOpen(true);
    }
    
    function handleCloseMenuClick() {
        setIsMenuOpen(false);
    }

//     function handleCardDelete(card) {
//         function makeRequest() { 
//             return api.removeCard(card._id).then(() => {
//                 const newCards = cards.filter(c => c._id !== card._id);
//                 setCards(newCards);
//                 closeAllPopups();
//             });
//         }
//         handleSubmit(makeRequest);
//     }

//     function handleUpdateUser(user) {
//         function makeRequest() { 
//             return api.editUserInfo(user).then((userData) => {
//                 setCurrentUser(userData);
//                 closeAllPopups();
//             });
//         }
//         setIsLoadingProfilePopup(true);
//         handleSubmit(makeRequest);
//     }

//     function handleLoginSubmit(formData) {
//         api.signin(formData)
//             .then((data) => {
//               setUseLoggedInToken(true);
//               localStorage.setItem('token', data.token);
//               setCurrentUserEmail(formData.email);
//               navigate('/');
//             }).catch((err) => {
//                 console.log(err);
//                 setIsAuthFail(true);
//             });
//     }

//     function handleSignuprSubmit(formData) {        
//           api.signup(formData)
//             .then(() => { 
//                 setIsSignupSuccess(true);
//                 navigate('/signin');
//             }).catch((err) => {
//                 console.log(err);
//                 setIsAuthFail(true);
//             });
//     }

//     function handleLoggedOut() {        
//         setUseLoggedInToken(false);
//         localStorage.removeItem('token');
//         navigate('/signin');
//     }     

    return (
        // <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
            <div className="page">
                
                <Routes>
                    <Route path="/" element={
                        <><Header handleMenuClick={handleMenuClick}/><Main /><Footer /></>
                    } />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path="/profile" element={
                        <><Header handleMenuClick={handleMenuClick}/><Profile user={currentUser} /></>
                    } />
                    <Route path="/films" element={
                        <><Header handleMenuClick={handleMenuClick}/><Search /><Films /><Footer /></>
                    } />
                    <Route path="/savedfilms" element={
                        <><Header handleMenuClick={handleMenuClick}/><Search /><SavedFilms /><Footer /></>
                    } />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
            <Popup isMenuOpen={isMenuOpen} handleCloseMenuClick={handleCloseMenuClick}/>
        </div>
        // </CurrentUserContext.Provider>
    );
}

export default App;
