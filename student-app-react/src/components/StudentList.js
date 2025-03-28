import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotificationModal from './NotificationModal'; 
import './StudentList.css'; 

function StudentList() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [notificationModal, setNotificationModal] = useState({
        isOpen: false,
        message: '',
        isSuccess: false,
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        filterAndSortStudents();
    }, [students, searchTerm, sortConfig]);

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
            confirmDeleteStudent(studentId); 
        }
    };

    const confirmDeleteStudent = async (studentIdToDelete) => { 
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

    const filterAndSortStudents = () => {
        let result = [...students];
        
        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(student => 
                student.name.toLowerCase().includes(term) ||
                student.email.toLowerCase().includes(term) ||
                student.age.toString().includes(term) ||
                student.id.toString().includes(term)
            );
        }
        
        // Sort data
        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        
        setFilteredStudents(result);
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    return (
        <div  className="student-list-container">
             <div className="student-list-header">
             <h2 className="page-title">Student Management</h2>
             <div className="controls-container">
                    <div className="search-box">
                        <i className="bi bi-search"></i>
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link to="/students/add" className="btn btn-primary add-button">
                        <i className="bi bi-plus-lg"></i> Add New Student
                    </Link>
                </div>
            </div>
             
                <div className="table-responsive">
                    <table className="table student-table">
                    <thead className="table-header">
                            <tr>
                                <th onClick={() => requestSort('id')}>
                                    ID {getSortIndicator('id')}
                                </th>
                                <th onClick={() => requestSort('name')}>
                                    Name {getSortIndicator('name')}
                                </th>
                                <th onClick={() => requestSort('age')}>
                                    Age {getSortIndicator('age')}
                                </th>
                                <th onClick={() => requestSort('email')}>
                                    Email {getSortIndicator('email')}
                                </th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td className="student-name">{student.name}</td>
                                        <td>{student.age}</td>
                                        <td className="student-email">{student.email}</td>
                                        <td className="text-end">
                                            <button 
                                                onClick={() => handleViewClick(student.id)} 
                                                className="btn btn-sm btn-outline-info me-1"
                                                title="View"
                                            >
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <Link 
                                                to={`/students/edit/${student.id}`}
                                                className="btn btn-sm btn-outline-secondary me-1"
                                                title="Edit"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </Link>
                                            <button 
                                                onClick={() => handleDeleteClick(student.id)} 
                                                className="btn btn-sm btn-outline-danger"
                                                title="Delete"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        No students found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
         

     
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