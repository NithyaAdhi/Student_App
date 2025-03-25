import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'; // Keep Bootstrap imports
// import { LinkContainer } from 'react-router-bootstrap'; // REMOVE LinkContainer import for now

function AppNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Student App</Navbar.Brand> {/* Keep Navbar.Brand */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/students">Student List </Nav.Link> 
                        <Nav.Link href="/students/add">Add Student </Nav.Link> 
                        <Nav.Link href="/login">Login  </Nav.Link>
                        <Nav.Link href="/register">Register </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;