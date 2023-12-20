

import React, { useState, useEffect } from 'react';
import Nav from "../components/Nav.jsx";
import UserCard from "../components/UserCard.jsx";
import Footer from "../components/Footer.jsx";

const AlumniRecords = () => {
    const [users, setUsers] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/users');
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('User deleted successfully!');
                // Update the users state after successful deletion
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            } else {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleCreateUser = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('User created successfully!');
                // Update the users state after successful creation
                setUsers(prevUsers => [...prevUsers, formData]);
                setShowCreateForm(false);
                setFormData({
                    username: '',
                    password: '',
                });
            } else {
                console.error('Failed to create user:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            <Nav />
            <div className='dash-body'>
                <h2>All created users</h2>
                <div>
                    <button className='blue' onClick={() => setShowCreateForm(true)}>Create</button>
                </div>

                {showCreateForm && (
                    <div className="create-form">
                        <input
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button onClick={handleCreateUser}>Save</button>
                        <button onClick={() => setShowCreateForm(false)}>Cancel</button>
                    </div>
                )}

                <div className='events'>
                    {users.map(user => (
                        <UserCard
                            key={user._id}
                            userId={user._id}
                            username={user.username}
                            timestamp={user.timestamp}
                            onDelete={handleDeleteUser}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default AlumniRecords;
