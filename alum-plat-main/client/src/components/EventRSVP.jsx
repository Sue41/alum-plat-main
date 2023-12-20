// import {BsPencilSquare, BsTrash} from "react-icons/bs";
//
// export default function EventRSVP({title,date,location,category}){
//     return(
//         <div className='event'>
//             <div className='e-title'>{title}</div>
//             <div className='e-det'>Date : {date}</div>
//             <div className='e-det'>Category : {category}</div>
//             <div className='e-det'>Venue : {location}</div>
//
//             <div className='e-btns'>
//
//
//                 <div className='e-mod del'>
//                     {/*<div className='icon'><BsTrash /></div>*/}
//
//                     <div className='e-text'>JOIN</div>
//                 </div>
//
//             </div>
//
//
//         </div>
//     )
// }

import { useState } from "react";
import { BsTrash } from "react-icons/bs";

export default function EventRSVP({ title, date, location, category, userId, eventId }) {
    const [joining, setJoining] = useState(false);

    const handleJoinEvent = async () => {
        console.log(userId)
        console.log(eventId)
        try {
            setJoining(true);

            const response = await fetch(`http://localhost:3001/api/events/events/${eventId}/participants/${userId}`, {
                method: 'POST',
            });

            if (response.ok) {
                alert('Joined the event successfully!');
                // You can update the UI or take further actions upon successful join
            } else {
                alert('You have to log in first to be able to join events')
                console.error('Failed to join event:', response.statusText);
                // Handle the error or provide user feedback
            }
        } catch (error) {
            console.error('Error joining event:', error);
            // Handle the error or provide user feedback
        } finally {
            setJoining(false);
        }
    };

    return (
        <div className='event'>
            <div className='e-title'>{title}</div>
            <div className='e-det'>Date : {date}</div>
            <div className='e-det'>Category : {category}</div>
            <div className='e-det'>Venue : {location}</div>

            <div className='e-btns'>
                <div className='e-mod del' onClick={handleJoinEvent} disabled={joining}>
                    {joining ? (
                        <span>Joining...</span>
                    ) : (
                        <div className='e-text'>JOIN</div>
                    )}
                </div>
            </div>
        </div>
    );
}
