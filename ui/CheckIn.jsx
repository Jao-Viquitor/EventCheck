import React from 'react';

export const CheckInButton = ({ person, handleCheckIn }) => (
    <button
        onClick={() => handleCheckIn(person._id)}
        className="bg-blue-500 w-64 text-primary px-4 py-2 rounded"
    >
        Check-in {person.firstName} {person.lastName}
    </button>
);

export const CheckOutButton = ({ person, handleCheckOut }) => (
    <button
        onClick={() => handleCheckOut(person._id)}
        className="bg-red-500 w-64 text-primary px-4 py-2 rounded"
    >
        Check-out {person.firstName} {person.lastName}
    </button>
);
