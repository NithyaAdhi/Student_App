import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationModal from './NotificationModal'; // Assuming you have this

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [notificationModal, setNotificationModal] = useState({ isOpen: false, message: '', isSuccess: false });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Placeholder - API call to login will go here
        console.log('Login submitted:', { username, password });
        showNotificationModal('Login functionality not yet implemented.', false); // Placeholder message
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
                <button type="button" onClick={() => navigate('/register')} className="btn btn-secondary ms-2">Register</button>
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