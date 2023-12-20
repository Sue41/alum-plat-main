// import Nav from "../components/Nav.jsx";
// import AddBtn from "../components/AddBtn.jsx";
//
// import EventCard from "../components/EventCard.jsx";
// import React from "react";
//
//
// export default function StudentDashboard(){
//     return(
//         <>
//             <Nav/>
//
//             <div className='dash-body'>
//                 <h1>Welcome to your Dashboard,Peter!</h1>
//                 <h2>Your Events</h2>
//                 <div style={{ display: "flex", justifyContent: "center" }}>
//                     <button  className='blue'>Create</button>
//                 </div>
//                 <div className='events'>
//
//                     <EventCard/>
//
//                 </div>
//
//             </div>
//         </>
//     )
// }


// import React, { useState, useEffect } from 'react';
// import Nav from '../components/Nav.jsx';
// import AddBtn from '../components/AddBtn.jsx';
// import EventCard from '../components/EventCard.jsx';
// import { useAuth } from '../authContext.jsx';
//
// const StudentDashboard = () => {
//     const { user } = useAuth();
//     const userId = user._id;
//     const [userEvents, setUserEvents] = useState([]);
//
//     useEffect(() => {
//         const fetchUserEvents = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3001/api/events/user/${userId}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setUserEvents(data);
//                 } else {
//                     console.error('Failed to fetch user events:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user events:', error);
//             }
//         };
//
//         fetchUserEvents();
//     }, [userId]);
//
//     return (
//         <>
//             <Nav />
//             <div className='dash-body'>
//                 <h1>Welcome to your Dashboard, {user.username}!</h1>
//                 <h2>Your Events</h2>
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     <button className='blue'>Create</button>
//                 </div>
//                 <div className='events'>
//                     {userEvents.map(event => (
//                         <EventCard
//                             key={event._id}
//                             title={event.title}
//                             date={event.date}
//                             category={event.category}
//                             location={event.location}
//                             eventId={event._id}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default StudentDashboard;


import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav.jsx';
import AddBtn from '../components/AddBtn.jsx';
import EventCard from '../components/EventCard.jsx';
import { useAuth } from '../authContext.jsx';
import Footer from "../components/Footer.jsx";

const StudentDashboard = () => {
    const { user } = useAuth();
    const userId = user._id;
    const [userEvents, setUserEvents] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        category: 'professional development', // Default category
        location: '',
        organizer: userId,
    });


    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/events/user/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUserEvents(data);
                } else {
                    console.error('Failed to fetch user events:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user events:', error);
            }
        };

        fetchUserEvents();
    }, [userId, showCreateForm,userEvents]);

    const createEvent = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/events/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData }),
            });

            if (response.ok) {
                alert('Event created successfully!');
                setShowCreateForm(false);
                setFormData({
                    title: '',
                    date: '',
                    category: 'professional development',
                    location: '',
                    organizer: userId,
                });
            } else {
                console.error('Failed to create event:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <>
            <Nav />
            <div className='dash-body'>
                <h1>Welcome to your Dashboard, {user.username}!</h1>
                <h2>Your Events</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={() => setShowCreateForm(true)} className='blue'>
                        Create
                    </button>
                </div>

                {showCreateForm && (
                    <div className='create-form'>
                        <input
                            type='text'
                            placeholder='Event Title'
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <input
                            type='date'
                            placeholder='Event Date'
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value='professional development'>Professional Development</option>
                            <option value='networking'>Networking</option>
                            <option value='campus events'>Campus Events</option>
                        </select>
                        <input
                            type='text'
                            placeholder='Event Location'
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                        <button onClick={createEvent}>Save</button>
                        <button onClick={() => setShowCreateForm(false)}>Cancel</button>
                    </div>
                )}

                <div className='events'>
                    {userEvents.map((event) => (
                        <EventCard
                            key={event._id}
                            title={event.title}
                            date={event.date}
                            category={event.category}
                            location={event.location}
                            eventId={event._id}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default StudentDashboard;
