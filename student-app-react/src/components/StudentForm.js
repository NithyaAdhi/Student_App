import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotificationModal from './NotificationModal';


function StudentForm() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [notificationModal, setNotificationModal] = useState({
        isOpen: false,
        message: '',
        isSuccess: false,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const newStudent = { name, age: parseInt(age), email };
            await axios.post('https://localhost:7137/api/Students', newStudent);
            showNotificationModal('Student added successfully!', true);
            setTimeout(() => {
                navigate('/students');
            }, 1500);
        } catch (error) {
            console.error('Error adding student:', error);
            showNotificationModal('Error adding student. Please check the console.', false);
        }
    };

    const showNotificationModal = (message, isSuccess) => {
        setNotificationModal({
            isOpen: true,
            message: message,
            isSuccess: isSuccess,
        });
    };

    const closeNotificationModal = () => {
        setNotificationModal({ ...notificationModal, isOpen: false });
    };

    return (
        <div className="container"> {/* Bootstrap container */}
            <h2>Add New Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3"> {/* Bootstrap margin-bottom */}
                    <label htmlFor="name" className="form-label">Name:</label> {/* Bootstrap form label */}
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required /> {/* Bootstrap form control */}
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age:</label>
                    <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Student</button> {/* Bootstrap button */}
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

export default StudentForm;