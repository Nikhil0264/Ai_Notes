import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

const protectRoute = ({children}) => {
    const {token} = useAuth();
    if(!token){
        return <Navigate to='/login'/>
    }
  return children;
}

export default protectRoute;
