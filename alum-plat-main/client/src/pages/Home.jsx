

import React from 'react';
import NavBar from "../components/Nav.jsx";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import EventsSect from "../components/EventsSect.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
    const { user, logout } = useAuth(); // Use the useAuth hook to access user data
    console.log(user)


    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className='home-hero'>
                <h1 className='home-head'>Welcome to the Alumni Platform</h1>
                <div className='sm-text'>
                    Discover Alumni events and connect with your fellow graduates.
                </div>
                <div className='btn-sect btn-s'>
                    {user ? (
                        // Display user details and logout button if user is logged in
                        <>
                            <p className="user-details">Welcome, {user.username}!</p>
                            <Button variant='danger' onClick={logout}>Logout</Button>
                            <a href="#events"><Button variant='secondary' >Explore Events</Button></a>
                        </>
                    ) : (
                        // Display login and explore events buttons if user is not logged in
                        <>
                            <Link to="/login"><Button variant='primary' className='btn blue'>Log In</Button></Link>
                            <a href="#events"><button  className='btn gray'>Explore Events</button></a>
                        </>
                    )}
                </div>
            </div>
            <div className='home-body' id='events'>
                <h1>Upcoming Events</h1>
                <EventsSect category="professional development" />
                <EventsSect category="networking" />
                <EventsSect category="campus events" />
            </div>
            <Footer/>
        </>
    );
};

export default Home;
