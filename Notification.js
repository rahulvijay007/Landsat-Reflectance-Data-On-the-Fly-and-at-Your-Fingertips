import React from 'react';

const Notification = ({ message, onClose }) => {
    return (
        <div style={{ background: 'lightyellow', padding: '10px', border: '1px solid gold', borderRadius: '5px' }}>
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Notification;
