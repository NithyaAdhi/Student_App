import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // We'll create this

function Profile() {
    const auth = useAuth();
    const navigate = useNavigate();

    // Debug user data
    console.log('User data:', auth.user);

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    };

    // Generate initials for avatar
    const getInitials = (name) => {
        if (!name) return 'GU';
        return name.split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Container className="profile-container">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="profile-card shadow">
                        <Card.Body className="text-center p-4">
                          
                            <div className="profile-avatar mb-4">
                                <div className="avatar-initials">
                                    {getInitials(auth.user?.username)}
                                </div>
                            </div>
                            
                            {/* User Information */}
                            <div className="profile-info mb-4">
                                <h2 className="profile-name">{auth.user?.username || 'Guest'}</h2>
                                <p className="profile-email">
                                    <i className="bi bi-envelope-fill me-2"></i>
                                    {auth.user?.email || 'Email not provided'}
                                </p>
                            </div>
                            
                            {/* Actions */}
                            <div className="profile-actions">
                                <Button 
                                    variant="outline-primary" 
                                    className="profile-btn"
                                    onClick={() => navigate('/students')}
                                >
                                    <i className="bi bi-people-fill me-2"></i>
                                    Manage Students
                                </Button>
                                <Button 
                                    variant="outline-danger" 
                                    className="profile-btn"
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Logout
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;