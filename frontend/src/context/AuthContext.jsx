import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext();


export function AuthProvider({children}){
    const [token,setToken] = useState(null);
    const [role,setRole] = useState(null);

    useEffect(()=>{
        const savedToken = localStorage.getItem("token");
        const savedRole = localStorage.getItem("role");
        if(savedToken){
            setToken(savedToken);
            setRole(savedRole);
        }
    },[])
    
    const login = (token,role)=>{
        localStorage.setItem("token",token);
        localStorage.setItem("role",role);
        setToken(token);
        setRole(role);
    }

    const logout = ()=>{
        localStorage.clear();
        setToken(null);
        setRole(null);
    }

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () =>{
    return useContext(AuthContext);
}
