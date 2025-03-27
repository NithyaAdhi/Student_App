import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import NotificationModal from './NotificationModal';

function Login({ onLogin }) { // Receive onLogin prop
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [notificationModal, setNotificationModal] = useState({ isOpen: false, message: '', isSuccess: false });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://localhost:7137/api/auth/login', { // Correct API endpoint URL
                username: username,
                password: password
            });

            // Successful login - store token and redirect
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            showNotificationModal(response.data.message || 'Login successful!', true); // Use message from API if available
            onLogin(); // Call the onLogin callback after successful login to update isLoggedIn in App.js
            setTimeout(() => {
                navigate('/students');
            }, 1500);

        } catch (error) {
            console.error('Login failed:', error);
            let errorMessage = 'Login failed. Please check your credentials.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            showNotificationModal(errorMessage, false);
        }
    };

    const showNotificationModal = (message, isSuccess) => {
        setNotificationModal({ isOpen: true, message: message, isSuccess: isSuccess });
    };

    const closeNotificationModal = () => {
        setNotificationModal({ ...notificationModal, isOpen: false });
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link to="/register" className="btn btn-secondary ms-2">Sign Up</Link> {/* Use Link for "Sign Up" */}
            </form>

            <NotificationModal
                isOpen={notificationModal.isOpen}
                message={notificationModal.message}
                isSuccess={notificationModal.isSuccess}
                onClose={closeNotificationModal}
            />
        </div>
    );
}

export default Login;