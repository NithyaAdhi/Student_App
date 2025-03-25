import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import AppNavbar from './AppNavbar'; // 
import { Container } from 'react-bootstrap'; 
import EditStudent from './components/EditStudent';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <BrowserRouter>
            <div>
                <AppNavbar/>

                <Container className="mt-4"> 
                    <Routes>
                        <Route path="/students" element={<StudentList />} />
                        <Route path="/students/add" element={<StudentForm />} />
                        <Route path="/" element={<StudentList />} /> {/* Default route */}
                        <Route path="/students/edit/:id" element={<EditStudent />} />
                        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;