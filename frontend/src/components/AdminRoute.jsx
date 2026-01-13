import React from 'react'
import { useAuth } from '../context/AuthContext'

function AdminRoute({children}) {
    const {token,role} = useAuth();
    
  if (!token) return <Navigate to="/login" />;
  if (role !== "admin") return <Navigate to="/notes" />;
  
  return children
}

export default AdminRoute
