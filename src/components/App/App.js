import {useEffect, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import Films from '../Films/Films';
import SavedFilms from '../SavedFilms/SavedFilms';
import Popup from '../Popup/Popup';
import {userData} from '../../utils/userData'

function App() { 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [currentUser, setCurrentUser] = useState('');
 

    useEffect(() => {
        setCurrentUser(userData);
     }, []);

    function handleMenuClick() {
        setIsMenuOpen(true);
    }
    
    function handleCloseMenuClick() {
        setIsMenuOpen(false);
    }
  

    return (
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
    );
}

export default App;
