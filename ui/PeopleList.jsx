import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const PeopleList = ({ people }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const itemsPerPage = 10;

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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1); // Reset to first page on new filter
    };

    const filteredPeople = people.filter(person => {
        const matchesSearchQuery = person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filter === 'all' ||
            (filter === 'checkedIn' && person.checkInDate) ||
            (filter === 'notCheckedIn' && !person.checkInDate);

        return matchesSearchQuery && matchesFilter;
    });

    const indexOfLastPerson = currentPage * itemsPerPage;
    const indexOfFirstPerson = indexOfLastPerson - itemsPerPage;
    const currentPeople = filteredPeople.slice(indexOfFirstPerson, indexOfLastPerson);

    const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex flex-col items-center justify-center dark:bg-gray-950">
            <div className="dark:bg-gray-900 bg-hoverSecondary p-2 pt-6 pb-6 rounded-lg shadow-lg text-center text-primary">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="mb-4 p-2 rounded border border-gray-300"
                />
                <select value={filter} onChange={handleFilterChange} className="mb-4 p-2 rounded border border-gray-300">
                    <option value="all">All</option>
                    <option value="checkedIn">Checked In</option>
                    <option value="notCheckedIn">Not Checked In</option>
                </select>
                <ul className="divide-y divide-gray-200 text-secondary dark:text-primary">
                    {currentPeople.map((person) => (
                        <li key={person._id} className="py-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{`${person.firstName} ${person.lastName}`}</p>
                                    <p>{person.companyName} - {person.title}</p>
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
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-white">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
