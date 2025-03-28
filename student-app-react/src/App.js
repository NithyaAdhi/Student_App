import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import EditStudent from './components/EditStudent';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { checkAuth } from './components/authService';
import AppNavbar from './AppNavbar';
import { useAuth } from './components/authContext';

function App() {
    const auth = useAuth();

    if (auth.loadingAuth) {
        return <div>Loading...</div>;
    }

    const RequireAuth = ({ children }) => {
        return auth.isLoggedIn ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            <div className="app-container">
                <AppNavbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<Navigate to={auth.isLoggedIn ? '/students' : '/login'} />} />
                        <Route path="/students" element={<RequireAuth><StudentList /></RequireAuth>} />
                        <Route path="/students/add" element={<RequireAuth><StudentForm /></RequireAuth>} />
                        <Route path="/students/edit/:id" element={<RequireAuth><EditStudent /></RequireAuth>} />
                        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
export default App;