import React, { useState, useEffect } from "react";
import Nav from "../components/Nav.jsx";
import EventRSVP from "../components/EventRSVP.jsx";
import { useAuth } from "../authContext.jsx";
import Footer from "../components/Footer.jsx";

export default function Events() {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/events");
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                } else {
                    console.error("Failed to fetch events:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [user]); // Fetch events whenever the user changes

    return (
        <>
            <Nav />
            <div className="dash-body">
                <h1>Upcoming Events</h1>
                <div className="events">
                    {events.map((event) => (
                        <EventRSVP
                            key={event._id}
                            title={event.title}
                            date={event.date}
                            category={event.category}
                            location={event.location}
                            userId={user._id}
                            eventId={event._id}
                        />
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
}
