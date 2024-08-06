import React from 'react';

export const EventSummary = ({ people }) => {
    const peopleInEvent = people.filter(person => person.checkInDate && !person.checkOutDate).length;
    const peopleByCompany = people.reduce((acc, person) => {
        person.company = undefined;
        if (person.checkInDate && !person.checkOutDate) {
            acc[person.company] = (acc[person.company] || 0) + 1;
        }
        return acc;
    }, {});
    const peopleNotCheckedIn = people.filter(person => !person.checkInDate).length;

    return (
        <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-700">Summary</h2>
            <p>People in the event right now: {peopleInEvent}</p>
            <p>People by company in the event right now:
                {Object.entries(peopleByCompany).map(([company, count]) => (
                    <span key={company}>{company} ({count}), </span>
                ))}
            </p>
            <p>People not checked-in: {peopleNotCheckedIn}</p>
        </div>
    );
};
