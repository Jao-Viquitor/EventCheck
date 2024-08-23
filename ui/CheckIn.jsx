import React from 'react';

export const CheckInButton = ({ person, handleCheckIn }) => (
    <button
        onClick={() => handleCheckIn(person._id)}
        className="bg-blue-500 w-full text-sm sm:w-52 text-primary px-2 py-2 rounded text-center mt-2"
    >
        Check-in {person.firstName} {person.lastName}
    </button>
);

export const CheckOutButton = ({ person, handleCheckOut }) => (
    <button
        onClick={() => handleCheckOut(person._id)}
        className="bg-red-500 w-full text-sm sm:w-52 text-primary px-2 py-2 rounded text-center mt-2"
    >
        Check-out {person.firstName} {person.lastName}
    </button>
);
