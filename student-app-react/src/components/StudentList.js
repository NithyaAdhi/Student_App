import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotificationModal from './NotificationModal'; // Keep NotificationModal for success/error messages

function StudentList() {
    const [students, setStudents] = useState([]);
    const [notificationModal, setNotificationModal] = useState({
        isOpen: false,
        message: '',
        isSuccess: false,
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://localhost:7137/api/Students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            showNotificationModal('Error loading students. Please check the console.', false);
        }
    };

    const handleDeleteClick = (studentId) => {
        if (window.confirm(`Are you sure you want to delete student with ID ${studentId}?`)) {
            confirmDeleteStudent(studentId); // Call confirmDeleteStudent directly with studentId
        }
    };

    const confirmDeleteStudent = async (studentIdToDelete) => { // Receive studentIdToDelete as argument
        try {
            await axios.delete(`https://localhost:7137/api/Students/${studentIdToDelete}`);
            showNotificationModal(`Student with ID ${studentIdToDelete} deleted successfully.`, true);
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
            showNotificationModal(`Error deleting student with ID ${studentIdToDelete}. Please check the console.`, false);
        }
    };

    const handleViewClick = (studentId) => {
        console.log(`View student with ID: ${studentId}`);
    };

    const handleEditClick = (studentId) => {
        console.log(`Edit student with ID: ${studentId}`);
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
        <div>
            <h2>Student List</h2>

            <Link to="/students/add">
                <button className="btn btn-primary mb-3">Add New Student</button> {/* Bootstrap button class */}
            </Link>

            <table className="table table-striped"> {/* Bootstrap table classes */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.email}</td>
                            <td>
                                <button onClick={() => handleViewClick(student.id)} className="btn btn-info btn-sm me-1">View</button> {/* Bootstrap button classes */}
                                <Link to={`/students/edit/${student.id}`}>
    <button className="btn btn-secondary btn-sm me-1">Edit</button>
</Link>
                                <button onClick={() => handleDeleteClick(student.id)} className="btn btn-danger btn-sm">Delete</button> {/* Bootstrap button classes */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Notification Modal for success/error messages */}
            <NotificationModal
                isOpen={notificationModal.isOpen}
                message={notificationModal.message}
                isSuccess={notificationModal.isSuccess}
                onClose={closeNotificationModal}
            />
        </div>
    );
}

export default StudentList;