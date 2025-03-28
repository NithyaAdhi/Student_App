import React, { createContext, useState, useEffect } from 'react';
import { checkAuth } from './authService';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await checkAuth();
            setIsLoggedIn(isAuthenticated);
            if (isAuthenticated) {
                // In a real app, you would fetch this from your API
                const userData = JSON.parse(localStorage.getItem('userData')) || {
                    username: 'Guest',
                    email: '',
                    profileImageUrl: '/profile-icon-placeholder.png'
                };
                setUser(userData);
            }
            setLoadingAuth(false);
        };
        checkAuthentication();
    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
    };

    const value = {
        isLoggedIn,
        user,
        login,
        logout,
        loadingAuth,
    };

    if (loadingAuth) {
        return <div>Loading Authentication...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    return React.useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };