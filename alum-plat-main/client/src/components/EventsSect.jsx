// import EventRSVP from "./EventRSVP.jsx";
//
//
// export default function EventsSect({category}){
//     return(
//         <>
//
//             <div className='events-sect'>
//                 <h2>{category}</h2>
//                 <div className='event-cards'>
//                     <EventRSVP/>
//                     <EventRSVP/>
//
//                 </div>
//
//
//             </div>
//
//         </>
//     )
// }


import React, { useState, useEffect } from 'react';
import EventRSVP from "./EventRSVP.jsx";
import {useAuth} from "../authContext.jsx";

const EventsSect = ({ category }) => {
    const { user, logout } = useAuth();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEventsByCategory = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/events/category/${category}`);
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                } else {
                    console.error(`Failed to fetch events by category ${category}:`, response.statusText);
                }
            } catch (error) {
                console.error(`Error fetching events by category ${category}:`, error);
            }
        };

        fetchEventsByCategory();
    }, [category]);

    return (
        <div className='events-sect'>
            <h2>{category}</h2>
            <div className='event-cards'>
                {events.map(event => (
                    <EventRSVP
                        key={event._id}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                        category={event.category}

                        eventId={event._id}
                    />
                ))}
            </div>
        </div>
    );
}

export default EventsSect;
