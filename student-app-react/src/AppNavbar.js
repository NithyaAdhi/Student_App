import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './components/authContext';
import './AppNavbar.css';

function AppNavbar() {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Student App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {auth.isLoggedIn && (
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/students">Student List</Nav.Link>
                            <Nav.Link as={Link} to="/students/add">Add Student</Nav.Link>
                        </Nav>
                    )}
                    <Nav className="ms-auto align-items-center">
                        {auth.isLoggedIn ? (
                            <>
                                <Navbar.Text className="text-white me-2">
                                    Welcome, {auth.user?.username}
                                </Navbar.Text>
                                <Nav.Link as={Link} to="/profile">
                                    <div className="d-flex align-items-center">
                                        <div 
                                            className="avatar-initials me-2"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: '#6c757d',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {auth.user?.username?.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                </Nav.Link>
                            <button
                                    className='logout'
                                    onClick={() => {
                                        auth.logout();
                                        navigate('/login');
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;