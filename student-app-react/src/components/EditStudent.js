import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import NotificationModal from './NotificationModal';

function EditStudent() {
    const { id } = useParams(); // Get the student ID from the URL parameter
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [notificationModal, setNotificationModal] = useState({
        isOpen: false,
        message: '',
        isSuccess: false,
    });
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchStudent = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://localhost:7137/api/Students/${id}`);
                const studentData = response.data;
                setName(studentData.name);
                setAge(String(studentData.age)); // Convert age to string for input field
                setEmail(studentData.email);
            } catch (error) {
                console.error('Error fetching student for edit:', error);
                showNotificationModal('Error loading student data for edit. Please check the console.', false);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]); // useEffect dependency on 'id'

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const updatedStudent = { id: parseInt(id), name, age: parseInt(age), email };
            await axios.put(`https://localhost:7137/api/Students/${id}`, updatedStudent);
            showNotificationModal('Student updated successfully!', true);
            setTimeout(() => {
                navigate('/students');
            }, 1500);
        } catch (error) {
            console.error('Error updating student:', error);
            showNotificationModal('Error updating student. Please check the console.', false);
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

    if (loading) {
        return <div>Loading student data...</div>; // Or a more sophisticated loading spinner
    }

    return (
        <div className="container">
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age:</label>
                    <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Update Student</button>
                <button type="button" onClick={() => navigate('/students')} className="btn btn-secondary ms-2">Cancel</button> {/* Cancel button */}
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

export default EditStudent;