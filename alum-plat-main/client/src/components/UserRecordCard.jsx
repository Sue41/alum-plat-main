import React from 'react';
import { Card, Button } from 'react-bootstrap';

const UserRecordCard = ({ user, onDelete }) => {
    return (
        <Card style={{ width: '18rem', margin: '20px', border: '1px solid #ccc' }}>
            <Card.Header className="bg-light">
                <h5>User Details</h5>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <strong>Username:</strong> {user.username}
                </Card.Text>
                <Card.Text>
                    <strong>Password:</strong> {user.password}
                </Card.Text>
                <Card.Text>
                    <strong>Role:</strong> {user.role}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Button variant="danger" onClick={() => onDelete(user._id)}>
                    Delete
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default UserRecordCard;
