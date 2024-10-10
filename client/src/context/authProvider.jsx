import { createContext, useState, useEffect } from 'react';
import { isAuthenticated } from '../helpers/authService';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        
            setAuth(isAuthenticated());
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
