import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NotificationModal from './NotificationModal';
import { useAuth } from './authContext';
import './Login.css';

function Login({ onLogin }) { // Receive onLogin prop
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [notificationModal, setNotificationModal] = useState({ isOpen: false, message: '', isSuccess: false });
    const auth = useAuth(); 



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://localhost:7137/api/auth/login', {
                username: username,
                password: password
            });

            const token = response.data.token;
            localStorage.setItem('authToken', token);

            // Store complete user data from API response
            const userData = {
                username: response.data.username || username,
                email: response.data.email || '',
                profileImageUrl: response.data.profileImageUrl || '/profile-icon-placeholder.png'
            };

            auth.login(userData);
            showNotificationModal('Login successful!', true);

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
        <div className="login-page" style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <div className="login-container">
                <div className="login-header">
                    <img src="/logo.png" alt="Student App Logo" width="80" className="mb-3" />
                    <h2>Welcome Back!</h2>
                    <p>Please enter your credentials to login</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-login">Login</button>

                    <div className="or-divider">OR</div>


                    <div className="d-flex justify-content-between mt-3">
                        <Link to="/register" className="btn btn-secondary" style={{ width: '48%' }}>
                            Sign Up
                        </Link>
                        <Link to="/forgot-password" className="btn btn-secondary" style={{ width: '48%' }}>
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>

            <NotificationModal
                isOpen={notificationModal.isOpen}
                message={notificationModal.message}
                isSuccess={notificationModal.isSuccess}
                onClose={() => setNotificationModal({ ...notificationModal, isOpen: false })}
            />
        </div>
    );
}

export default Login;