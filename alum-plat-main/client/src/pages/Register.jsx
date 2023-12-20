

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Perform registration logic here
            console.log('Registration data:', formData);

            // Send the registration data to your backend
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Registration successful!');
                // Assuming a successful registration, navigate to the login page
                alert('Registration successful!')
                navigate('/login');
            } else {
                console.error('Registration failed:', response.statusText);
                // Handle registration failure, e.g., show an error message
            }
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle registration failure, e.g., show an error message
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1 className="text-center mb-4">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="add-btn l">
                        Register
                    </button>

                    <div className="mt-3 text-center">
                        <p>Already have an account? <Link to="/login">Sign in instead</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
