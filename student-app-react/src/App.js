import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import EditStudent from './components/EditStudent';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { checkAuth } from './components/authService'; // We'll create this authService
import AppNavbar from './AppNavbar';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
    const [loadingAuthCheck, setLoadingAuthCheck] = useState(true); // State for initial auth check

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await checkAuth(); // Check if token is valid
            setIsLoggedIn(isAuthenticated);
            setLoadingAuthCheck(false);
        };
        checkAuthentication();
    }, []);

    if (loadingAuthCheck) {
        return <div>Loading...</div>; // Or a loading spinner
    }


    const RequireAuth = ({ children }) => {
        return isLoggedIn ? children : <Navigate to="/login" />;
    };

    return (
        <BrowserRouter>
     <AppNavbar/>
                <Routes>
                    <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} /> {/* Pass onLogin callback */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Navigate to="/login" />} /> 

                    <Route path="/students" element={<RequireAuth><StudentList /></RequireAuth>} />
                    <Route path="/students/add" element={<RequireAuth><StudentForm /></RequireAuth>} />
                    <Route path="/students/edit/:id" element={<RequireAuth><EditStudent /></RequireAuth>} />
                    <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

                </Routes>
       
        </BrowserRouter>
    );
}

export default App;