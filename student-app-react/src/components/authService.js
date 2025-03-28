// src/authService.js

export const checkAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return false; 
    }

   

    return true; 
};

export const logout = () => {
    localStorage.removeItem('authToken'); 
  
};