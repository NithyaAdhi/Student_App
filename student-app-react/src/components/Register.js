import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import NotificationModal from './NotificationModal';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Add confirmPassword state
    const [email, setEmail] = useState(''); // Add email state
    const navigate = useNavigate();
    const [notificationModal, setNotificationModal] = useState({ isOpen: false, message: '', isSuccess: false });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            showNotificationModal('Passwords do not match.', false);
            return;
        }

        try {
            const response = await axios.post('https://localhost:7137/api/auth/register', { // Correct API endpoint URL
                username: username,
                email: email, // Include email
                password: password,
                confirmPassword: confirmPassword // Include confirmPassword
            });

            // Successful registration
            showNotificationModal(response.data.message || 'Registration successful!', true); // Use message from API if available
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after registration
            }, 1500);

        } catch (error) {
            console.error('Registration failed:', error);
            let errorMessage = 'Registration failed. Please check the form.';
            if (error.response && error.response.data && error.response.data.errors) {
                // Handle model validation errors from API (if your API returns them in 'errors' field)
                const errorList = Object.values(error.response.data.errors).flat(); // Flatten errors if API returns a dictionary
                errorMessage = errorList.join('\n'); // Join errors into a single string for display
            } else if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message; // Fallback to a general API message if available
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
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <button type="button" onClick={() => navigate('/login')} className="btn btn-secondary ms-2">Login</button>
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

export default Register;