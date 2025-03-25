import React from 'react';
import './NotificationModal.css'; // Create a CSS file for the modal

function NotificationModal({ isOpen, message, onClose, isSuccess }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="notification-modal-overlay">
            <div className="notification-modal-content">
                <p className={isSuccess ? 'success-notification' : 'error-notification'}>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}

export default NotificationModal;