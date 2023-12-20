// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
//
// const Login = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//     });
//
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         try {
//             // Perform login logic here
//             console.log('Login data:', formData);
//
//             // Send the login data to your backend
//             const response = await fetch('http://localhost:3001/api/users/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });
//
//             if (response.ok) {
//                 console.log('Login successful!');
//                 // Assuming a successful login, navigate to the dashboard or home page
//                 alert('Login successful!');
//                 navigate('/'); // Change to the appropriate route
//             } else {
//                 console.error('Login failed:', response.statusText);
//                 // Handle login failure, e.g., show an error message
//             }
//         } catch (error) {
//             console.error('Login failed:', error);
//             // Handle login failure, e.g., show an error message
//         }
//     };
//
//     return (
//         <div className="login-container">
//             <div className="login-form">
//                 <h1 className="text-center mb-4">Login</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="username">Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             placeholder="Enter your username"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//
//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             placeholder="Enter your password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//
//                     <button type="submit" className="login-btn">
//                         Login
//                     </button>
//
//                     <div className="mt-3 text-center">
//                         <p>Don't have an account? <Link to="/register">Sign up instead</Link></p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "../authContext.jsx";



const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Use the useAuth hook
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
            // Perform login logic here
            console.log('Login data:', formData);

            // Send the login data to your backend
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Login successful!');
                const responseData = await response.json();

                // Assuming a successful login, save user data to the AuthContext
                login(responseData.user);
                // console.log(responseData.user)


                // Navigate to the dashboard or home page
                alert('Login successful!');
                navigate('/'); // Change to the appropriate route
            } else {
                console.error('Login failed:', response.statusText);
                // Handle login failure, e.g., show an error message
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure, e.g., show an error message
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="text-center mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
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
                            className="form-control"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary login-btn">
                        Login
                    </button>

                    <div className="mt-3 text-center">
                        <p>Don't have an account? <Link to="/register">Sign up instead</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
