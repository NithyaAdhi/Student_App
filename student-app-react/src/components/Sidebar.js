import React from 'react';
import { NavLink } from 'react-router-dom'; // For active link styling
import './Sidebar.css'; // Create a CSS file for sidebar styling

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="profile-section">
                <img src="/profile-placeholder.png" alt="Profile" className="profile-image" /> {/* Placeholder image */}
                <h5 className="username">User Name</h5> {/* Placeholder username */}
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/students" className="nav-link" activeClassName="active-link">
                    <i className="bi bi-house-fill"></i> Home
                </NavLink>
                <NavLink to="/students" className="nav-link" activeClassName="active-link"> {/* Assuming "Pages" link to Student List */}
                    <i className="bi bi-file-earmark-fill"></i> Pages
                </NavLink>
                {/* Add more navigation links here as needed */}
            </nav>
        </div>
    );
}

export default Sidebar;