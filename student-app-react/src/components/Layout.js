import React from 'react';
import AppNavbar from '../AppNavbar'
import Sidebar from './Sidebar';
import { Container } from 'react-bootstrap';

function Layout({ children }) { // Layout component takes 'children' prop
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <div className="content-area">
                    <AppNavbar />
                    <Container className="mt-4 main-content-container">
                        {children} {/* Render the page content (children) here */}
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default Layout;