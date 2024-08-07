import React from 'react';

export const EventSummary = ({ people }) => {
    const peopleInEvent = people.filter(person => person.checkInDate && !person.checkOutDate).length;
    const peopleByCompany = people.reduce((acc, person) => {
        if (person.checkInDate && !person.checkOutDate) {
            acc[person.companyName] = (acc[person.companyName] || 0) + 1;
        }
        return acc;
    }, {});
    const peopleNotCheckedIn = people.filter(person => !person.checkInDate).length;

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold text-secondary dark:text-primary">Summary</h2>
            <p className="text-sm text-secondary dark:text-primary mt-1 me-1">
                People in the event right now: {peopleInEvent}</p>
            <p className="text-sm text-secondary dark:text-primary whitespace-wrap mt-1 me-1" style={{ maxWidth: '350px' }}>
                People by company in the event right now: {Object.entries(peopleByCompany).map(([companyName, count]) => (
                    <span key={companyName}>{companyName} ({count}), </span>
                ))}
            </p>
            <p className="text-sm text-secondary dark:text-primary mt-1">People not checked-in: {peopleNotCheckedIn}</p>
        </div>
    );
};
