import React, {createContext, useEffect, useState} from 'react';
import { getToken, setToken as saveToken } from './apis/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ authToken, setAuthToken] = useState(getToken());
    const [user, setUser ] = useState(null);

    useEffect(() =>{
        if (authToken){
            const [, payload] = authToken.split('.');
            const decoded = JSON.parse(atob(payload));
            setUser({ id: decoded.userId, role: decoded.role });
        }
    }, [authToken]);


    const login = (token) => {
        saveToken(token);
        setAuthToken(token);
    };

    //logout method

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};