import {mainApi} from '../../utils/MainApi.js';
import {movieApi} from '../../utils/MovieApi.js';
import { useEffect, useState, useCallback } from 'react';
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
import Preloader from '../Preloader/Preloader';
import Popup from '../Popup/Popup'; 
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

function App() {
    const navigate = useNavigate();
    const [appIsLoading, setAppIsLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const [useLoggedInToken, setUseLoggedInToken] = useState(false);
    const [savedMovies, setSavedMovies] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [updateError, setUpdateError] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    
    const hanldeUserLoggedIn = useCallback(() => { 
            mainApi.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
                setUseLoggedInToken(true); 
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => { 
                setAppIsLoading(false)
            });
        
    }, []);

    const handleGetSavedMovies = useCallback(() => {      
        function makeRequest() { 
            return mainApi.getSavedMovie().then((savedMovies) => {
                setSavedMovies(savedMovies);
            });
        }
        handleSubmit(makeRequest);
    }, []);


    const handleGetMovies = useCallback(async () => {  
        setIsLoading(true);
       
        try {
            const newMovies = [];
            const movies = await movieApi.getMovies();
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
                    image: (`https://api.nomoreparties.co${movie.image.url}`),
                    trailerLink: movie.trailerLink,
                    thumbnail: (`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`),
                })
            });
            return newMovies;
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    function handleSubmit(request) {
        request()
            .then(() => { 
            })
            .catch((err) => {
                console.error(`Ошибка: ${err}`);
            })
            .finally(() => { 
            });
    }
        

    function handleMenuClick() {
        setIsMenuOpen(true);
    }
    
    function handleCloseMenuClick() {
        setIsMenuOpen(false);
    }

     

    function handleAddMovie(movie) {        
        function makeRequest() {
            return mainApi.addMovie(movie).then((newMovie) => {
                setSavedMovies([newMovie, ...savedMovies]);
            });
        }

        const movieID = movie.movieId;
        const movieExists = savedMovies.some(movie => movie.movieId === movieID);
        if (!movieExists) {
            const userId = currentUser._id;
            movie.owner = userId;
            handleSubmit(makeRequest);
        } 
    }

    function handleDeleteMovie(movie) {
        function makeRequest() {
            return mainApi.removeMovie(movieExists._id).then(() => {
                const newMovies = savedMovies.filter(m => m.movieId !== movie.movieId);
                setSavedMovies(newMovies);
            });
        }
        const movieID = movie.movieId;
        const movieExists = savedMovies.find(movie => movie.movieId === movieID);
        if (movieExists) {
            handleSubmit(makeRequest);
        }
    }

    function handleUpdateUser(user) {
        setUpdateError(false);
        function makeRequest() { 
            return mainApi.editUserInfo(user).then((userData) => {
                setCurrentUser(userData);
                setUpdateSuccess(true);
            }).catch((err) => {
                console.log(err);
                setUpdateError(err);
            });
        }
        handleSubmit(makeRequest);
    }

    function handleSetSuccess(){
        setUpdateSuccess(false);
    }
 
    function handleLoginSubmit(formData) {
        setAuthError(false);  
        mainApi.signin(formData)
            .then((data) => {
              setUseLoggedInToken(true);  
            }).catch((err) => {
                console.log(err);
                setAuthError(true);
            });
    }

    function handleSignupSubmit(formData) {
        setAuthError(false);       
        mainApi.signup(formData)
            .then((userData) => {
                setCurrentUser(userData);
                setUseLoggedInToken(true);  
            }).catch((err) => {
                console.log(err);
                setAuthError(true);
            });
    }

    function handleLoggedOut() {        
        mainApi.signout()
            .then(() => {
                setUseLoggedInToken(false);
                localStorage.clear();
                setCurrentUser(null);
                setSavedMovies([]);
            }).catch((err) => {
                console.log(err);
                setAuthError(true);
            });
        navigate('/');
    } 


    useEffect(() => {
        hanldeUserLoggedIn();
    }, [useLoggedInToken, hanldeUserLoggedIn]);
    
    useEffect(() => {
        if(useLoggedInToken) {
            handleGetSavedMovies()
        }
    }, [useLoggedInToken, handleGetSavedMovies]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
                
                { appIsLoading ? (  
                        <Preloader/>
                    ) : (
                    <>
                        <div className="page">
                        <Routes>
                            <Route path="/" element={
                                <><Header handleMenuClick={handleMenuClick}/><Main /><Footer /></>
                            } />
                            <Route path="/profile" element={
                                <><Header handleMenuClick={handleMenuClick}/><ProtectedRoute element={Profile} onLogout={handleLoggedOut} onUpdate={handleUpdateUser} updateError={updateError} updateSuccess={updateSuccess} handleSetSuccess={handleSetSuccess}/></>
                            } />
                            <Route path="/movies" element={
                                <><Header handleMenuClick={handleMenuClick}/><ProtectedRoute element={Movies} isLoading={isLoading} savedMovies={savedMovies} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie} handleGetMovies={handleGetMovies} /><Footer /></>
                            } />
                            <Route path="/saved-movies" element={
                                <><Header handleMenuClick={handleMenuClick}/><ProtectedRoute element={SavedMovies} isLoading={isLoading} savedMovies={savedMovies} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie} handleGetMovies={handleGetMovies}  /><Footer /></>
                            } />
                            
                            <Route path="/signup" element={<Signup onSignup={handleSignupSubmit} authError={authError} />} />
                            <Route path="/signin" element={<Login onLogIn={handleLoginSubmit} authError={authError} />} />

                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                        </div>
                        <Popup isMenuOpen={isMenuOpen} handleCloseMenuClick={handleCloseMenuClick}/>
                    </>
                    )
                }
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
