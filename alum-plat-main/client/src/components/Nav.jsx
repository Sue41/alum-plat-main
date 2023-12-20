// import React from 'react';
// import { Link } from 'react-router-dom';
// import  './components.css'
//
// const NavBar = () => {
//     return (
//         <nav className="navbar">
//             <div className="navbar-logo">
//                 <Link to="/">Alumni Platform</Link>
//             </div>
//             <ul className="nav-links">
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/login">Sign In</Link></li>
//                 <li><Link to="/about">About</Link></li>
//                 <li><Link to="/events">Events</Link></li>
//                 {/* Add more links as needed */}
//             </ul>
//         </nav>
//     );
// };
//
// export default NavBar;

// NavBar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import  './components.css'
import { useAuth } from '../authContext'; // Adjust the import path

const NavBar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Alumni Platform</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/events">Events</Link></li>

                {user ? (
                    <>
                        {user.role === 'alumni' && <li><Link to="/student-dashboard">Alumni Dashboard</Link></li>}
                        {user.role === 'admin' && <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>}

                        <li onClick={logout}><Link to="/">Logout</Link></li>
                    </>
                ) : (
                    <li><Link to="/login">Sign In</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;

