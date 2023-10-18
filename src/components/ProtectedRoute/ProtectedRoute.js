import React, {  useContext} from 'react';
import { Navigate } from "react-router-dom"; 
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

const ProtectedRoute = ({ element: Component, ...props  }) => {
     const currentUser = useContext(CurrentUserContext);

     if (currentUser === null) {  
      return <Preloader/>
    }
  return (
    currentUser ? <Component {...props} /> : <Navigate to="/" replace/>
)}

export default ProtectedRoute;