// src/authService.js

export const checkAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        return false; // No token found, not authenticated
    }

    // You can add token validation logic here if needed
    // For example, you might want to send a request to your API
    // to check if the token is still valid.
    // For this basic example, we'll just assume token presence means authenticated.

    return true; // Token exists, assume authenticated for now
};

export const logout = () => {
    localStorage.removeItem('authToken'); // Remove token from local storage
    // You can add other logout actions here, like clearing user-specific state
};