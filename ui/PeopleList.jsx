import React from 'react';
import { Meteor } from 'meteor/meteor';

export const PeopleList = ({ people }) => {
    const handleCheckIn = (personId) => {
        Meteor.call('people.checkIn', personId);
    };

    const handleCheckOut = (personId) => {
        Meteor.call('people.checkOut', personId);
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    const isCheckedInOverFiveSeconds = (checkInDate) => {
        if (!checkInDate) return false;
        const fiveSecondsAgo = new Date(Date.now() - 5000);
        return checkInDate < fiveSecondsAgo;
    };

    return (
        <ul className="divide-y divide-gray-200">
            {people.map((person) => (
                <li key={person._id} className="py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{`${person.firstName} ${person.lastName}`}</p>
                            <p>{person.company} - {person.title}</p>
                            <p>Check-in: {formatDate(person.checkInDate)}</p>
                            <p>Check-out: {formatDate(person.checkOutDate)}</p>
                        </div>
                        <div>
                            {!person.checkInDate && (
                                <button
                                    onClick={() => handleCheckIn(person._id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Check-in {person.firstName} {person.lastName}
                                </button>
                            )}
                            {isCheckedInOverFiveSeconds(person.checkInDate) && !person.checkOutDate && (
                                <button
                                    onClick={() => handleCheckOut(person._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Check-out {person.firstName} {person.lastName}
                                </button>
                            )}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};
