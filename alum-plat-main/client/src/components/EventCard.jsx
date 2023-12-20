
import React, { useState } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

export default function EventCard({ eventId, title, date, category, location, fetchEvents }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ title, date, category, location });

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this event?');

        if (confirmDelete) {
            // Perform delete logic here
            fetch(`http://localhost:3001/api/events/${eventId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        // Handle successful deletion, e.g., update the UI or fetch events again
                        console.log('Event deleted successfully');
                        fetchEvents(); // Fetch events after successful deletion
                    } else {
                        console.error('Failed to delete event:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Failed to delete event:', error);
                });
        }
    };

    const handleModify = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Perform update logic here
        fetch(`http://localhost:3001/api/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    // Handle successful update, e.g., update the UI or fetch events again
                    console.log('Event updated successfully');
                    alert('Update saved')
                    // fetchEvents(); // Fetch events after successful update
                    setIsEditing(false);
                } else {
                    console.error('Failed to update event:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Failed to update event:', error);
            });
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='event'>
            <div className='e-title'>
                {isEditing ? (
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                ) : (
                    title
                )}
            </div>
            <div className='e-det'>
                Date : {isEditing ? <input type="text" name="date" value={formData.date} onChange={handleChange} /> : date}
            </div>
            <div className='e-det'>
                Category : {isEditing ? <input type="text" name="category" value={formData.category} onChange={handleChange} /> : category}
            </div>
            <div className='e-det'>
                Venue : {isEditing ? <input type="text" name="location" value={formData.location} onChange={handleChange} /> : location}
            </div>

            <div className='e-btns'>
                {isEditing ? (
                    <>
                        <div className='e-mod save' onClick={handleSave}>
                            <div className='e-text save'>Save</div>
                        </div>
                        <div className='e-mod cancel' onClick={handleCancel}>
                            <div className='e-text save'>Cancel</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='e-mod edit' onClick={handleModify}>
                            <div className='icon'> <BsPencilSquare /></div>
                            <div className='e-text'>Modify</div>
                        </div>
                        <div className='e-mod del' onClick={handleDelete}>
                            <div className='icon'><BsTrash /></div>
                            <div className='e-text'>Delete</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
