import {mainApi} from '../../utils/MainApi.js';
import {movieApi} from '../../utils/MovieApi.js';
import {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Popup from '../Popup/Popup';
import {userData} from '../../utils/userData'
import {moviesImages} from '../../utils/moviesImages';

function App() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState('');
    const [useLoggedInToken, setUseLoggedInToken] = useState(false);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [searchHistory, setSearchHistory] = useState(null);
    const [isAuthFail, setIsAuthFail] = useState(false);

    useEffect(() => {
        if(useLoggedInToken) {
         mainApi.getUserInfo()
             .then((userData) => {
                 setCurrentUser(userData);
             })
             .catch((err) => {
                 console.log(err);
             });
         }
     }, [useLoggedInToken]);

     useEffect(() => {
        const searchHistory = localStorage.getItem('searchHistory') 
        if (searchHistory) {
            setSearchHistory(searchHistory);
        }
     }, []);

     useEffect(() => {
        const token = localStorage.getItem('token') 
        if (token) {
            mainApi.getUserInfo()
            .then((data) => {
                setUseLoggedInToken(true);
                navigate('/movies');
            })
            .catch((err) => {
                console.log(err);
            });
        }
        // eslint-disable-next-line
     }, []);

    function handleMenuClick() {
        setIsMenuOpen(true);
    }
    
    function handleCloseMenuClick() {
        setIsMenuOpen(false);
    }

    function handleSubmit(request) {
        request()
            .then(() => {
                // closeAllPopups();закрыть прелоудер
            })
            .catch((err) => {
                console.error(`Ошибка: ${err}`);
            })
            .finally(() => {
                // setIsLoadingPlacePopup(false);
                // setIsLoadingProfilePopup(false);
                // setIsLoadingAvatarPopup(false);
            });
    }

    function handleGetMovies() {
        function makeRequest() {
            return movieApi.getMovies().then((movies) => {
                const newMovies = [];
                    movies.forEach(movie => {
                        newMovies.push({
                            movieId: movie.id,
                            nameRU: movie.nameRU,
                            nameEN: movie.nameEN,
                            country: movie.country,
                            director: movie.director,
                            duration: movie.duration,
                            year: movie.year,
                            description: movie.description,
                            image: movie.image.url,
                            trailerLink: movie.trailerLink,
                            thumbnail: movie.image.formats.thumbnail.url, 
                        })
                    }); 
                setMovies(newMovies);
            });
        }
        handleSubmit(makeRequest);
    }

    function handleGetSavedMovies() {        
        function makeRequest() { 
            return mainApi.getSavedMovie().then((savedMovie) => {
                setSavedMovies(savedMovie);
            });
        }
        handleSubmit(makeRequest);
    }

    function handleAddMovie(movie) {        
        function makeRequest() { 
            return mainApi.addMovie(movie).then((newMovie) => {
                setSavedMovies([newMovie, ...movies]);
            });
        }
        handleSubmit(makeRequest);
    }

    function handleDeleteMovie(movie) {
        function makeRequest() {
            return mainApi.removeMovie(movie._id).then(() => {
                const newMovies = savedMovies.filter(m => m._id !== movie._id);
                setSavedMovies(newMovies);
            });
        }
        handleSubmit(makeRequest);
    }

    function handleUpdateUser(user) {
        function makeRequest() { 
            return mainApi.editUserInfo(user).then((userData) => {
                setCurrentUser(userData);
            });
        }
        handleSubmit(makeRequest);
    }

    function handleLoginSubmit(formData) {
        mainApi.signin(formData)
            .then((data) => {
              setUseLoggedInToken(true);
              localStorage.setItem('token', data.token);
              navigate('/movies');
            }).catch((err) => {
                console.log(err);
                setIsAuthFail(true);
            });
    }

    function handleSignupSubmit(formData) {        
        mainApi.signup(formData)
            .then(() => {
                setUseLoggedInToken(true);
                navigate('/movies');
            }).catch((err) => {
                console.log(err);
                setIsAuthFail(true);
            });
    }

    function handleLoggedOut() {        
        setUseLoggedInToken(false);
        localStorage.removeItem('token');
        setCurrentUser(null);
        navigate('/');
    } 

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
            <div className="page">                
                <Routes>
                    <Route path="/" element={
                        <><Header handleMenuClick={handleMenuClick}/><Main /><Footer /></>
                    } />
                    <Route path="/signup" element={<Signup onSignup={handleSignupSubmit} />} />
                    <Route path="/signin" element={<Login onLogIn={handleLoginSubmit} />} />
                    <Route path="/profile" element={
                        <><Header handleMenuClick={handleMenuClick}/><Profile user={currentUser} onLogout={handleLoggedOut} onUpdate={handleUpdateUser}/></>
                    } />
                    <Route path="/movies" element={
                        <><Header handleMenuClick={handleMenuClick}/><Movies movies={movies} setMovies={setMovies} searchHistory={searchHistory} handleGetMovies={handleGetMovies} /><Footer /></>
                    } />
                    <Route path="/saved-movies" element={
                        <><Header handleMenuClick={handleMenuClick}/><SavedMovies movies={moviesImages} handleGetSavedMovies={handleGetSavedMovies}/><Footer /></>
                    } />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
            <Popup isMenuOpen={isMenuOpen} handleCloseMenuClick={handleCloseMenuClick}/>
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
