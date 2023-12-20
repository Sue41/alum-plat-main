import React from 'react';
import { BsTrash } from "react-icons/bs";

export default function UserCard({ userId, username, timestamp, onDelete }) {
    const handleDelete = () => {
        onDelete(userId);
    };

    return (
        <>
            <div className='event '>
                <div className='e-det'>Username: {username}</div>
                <div className='e-det'>Created at: {timestamp}</div>

                <div className='e-btns'>
                    <div className='e-mod del' onClick={handleDelete}>
                        <div className='icon'><BsTrash /></div>
                        <div className='e-text'>Delete</div>
                    </div>
                </div>
            </div>
        </>
    );
}
