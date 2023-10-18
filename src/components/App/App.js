import {mainApi} from '../../utils/MainApi.js';
import {movieApi} from '../../utils/MovieApi.js';
import { useEffect, useState } from 'react';
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
import Popup from '../Popup/Popup'; 
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';

function App() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const [useLoggedInToken, setUseLoggedInToken] = useState(false);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState(null);
    const [updateError, setUpdateError] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token') 
        if (token) {
            mainApi.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
                setUseLoggedInToken(true); 
            })
            .catch((err) => {
                console.log(err);
            });
        } 
    }, []);

    useEffect(() => {
        if(useLoggedInToken) {
         handleGetSavedMovies()
         mainApi.getUserInfo()
             .then((userData) => {
                 setCurrentUser(userData);
             })
             .catch((err) => {
                 console.log(err);
             });
         }
     }, [useLoggedInToken]);
 
 

    function handleMenuClick() {
        setIsMenuOpen(true);
    }
    
    function handleCloseMenuClick() {
        setIsMenuOpen(false);
    }

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

    function handleGetMovies() {
        function makeRequest() {
            setIsLoading(true);
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
                            image: (`https://api.nomoreparties.co${movie.image.url}`),
                            trailerLink: movie.trailerLink,
                            thumbnail: (`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`),
                        })
                    }); 
                setMovies(newMovies);
            })
            .finally(() => {
                setIsLoading(false);
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
            }).catch((err) => {
                console.log(err);
                setUpdateError(err);
            });

            
        }
        handleSubmit(makeRequest);
    }

    function handleLoginSubmit(formData) {
        setAuthError(false);  
        mainApi.signin(formData)
            .then((data) => {
              setUseLoggedInToken(true);
              localStorage.setItem('token', data.token);
              navigate('/movies');
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
                navigate('/movies');
            }).catch((err) => {
                console.log(err);
                setAuthError(true);
            });
    }

    function handleLoggedOut() {        
        setUseLoggedInToken(false);
        localStorage.removeItem('token');
        localStorage.removeItem('searchText');
        localStorage.removeItem('shortMovie');
        localStorage.removeItem('searchResults');
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

                    
                    <Route path="/signup" element={<Signup onSignup={handleSignupSubmit} authError={authError} />} />
                    <Route path="/signin" element={<Login onLogIn={handleLoginSubmit} authError={authError} />} />

                    <Route path="/profile" element={
                        <><Header handleMenuClick={handleMenuClick}/><ProtectedRoute element={Profile} user={currentUser} onLogout={handleLoggedOut} onUpdate={handleUpdateUser} updateError={updateError}/></>
                    } />
                    <Route path="/movies" element={
                        <><Header handleMenuClick={handleMenuClick}/><ProtectedRoute element={Movies} isLoading={isLoading} movies={movies} savedMovies={savedMovies} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie} handleGetMovies={handleGetMovies} /><Footer /></>
                    } />
                    <Route path="/saved-movies" element={
                        <><Header handleMenuClick={handleMenuClick}/><ProtectedRoute element={Movies} isLoading={isLoading} movies={movies} savedMovies={savedMovies} handleAddMovie={handleAddMovie} handleDeleteMovie={handleDeleteMovie} handleGetMovies={handleGetMovies}  /><Footer /></>
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
