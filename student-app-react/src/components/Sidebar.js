import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src="/school-logo.png" alt="School Logo" className="sidebar-logo" />
                <div className="profile-text">Profile</div>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/students" className="nav-link" activeClassName="active">
                    <i className="bi bi-house"></i> Home
                </NavLink>
                <NavLink to="/students" className="nav-link" activeClassName="active">
                    <i className="bi bi-file-earmark"></i> Pages
                </NavLink>
                <NavLink to="/profile" className="nav-link" activeClassName="active"> 
                    <i className="bi bi-person-circle"></i> Profile 
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;