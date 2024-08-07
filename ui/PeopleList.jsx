import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import {CheckInButton, CheckOutButton} from "./CheckIn.jsx";
import {SearchInput} from "./SearchInput";
import {Pagination} from "./Pagination";
import {SelectFilter} from "./SelectFilter";

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

    const filterOptions = [
        { value: 'all', label: 'All' },
        { value: 'checkedIn', label: 'Checked In' },
        { value: 'notCheckedIn', label: 'Not Checked In' },
    ];

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
        <div className="min-h-screen bg-secondary flex flex-col items-center justify-start dark:bg-gray-950">
            <div className="w-7/12 dark:bg-gray-900 bg-hoverSecondary p-8 pt-6 pb-6 rounded-lg shadow-lg text-center text-primary">
                <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
                <SelectFilter
                    value={filter}
                    onChange={handleFilterChange}
                    options={filterOptions}/>
                <ul className="divide-y divide-gray-200 text-secondary dark:text-primary">
                    {currentPeople.map((person) => (
                        <li key={person._id} className="py-4">
                            <div className="flex justify-between">
                                <div>
                                    <div className="flex justify-center">
                                        <p className="font-semibold text-center">{`${person.firstName} ${person.lastName}`}</p>
                                    </div>
                                    <p className="text-left">{person.companyName} - {person.title}</p>
                                    <p className="text-left">Check-in: {formatDate(person.checkInDate)}</p>
                                    <p className="text-left">Check-out: {formatDate(person.checkOutDate)}</p>
                                </div>
                                <div>
                                    {!person.checkInDate ? (
                                        <CheckInButton person={person} handleCheckIn={handleCheckIn} />
                                    ) : (
                                        isCheckedInOverFiveSeconds(person.checkInDate) &&
                                        !person.checkOutDate && (
                                            <CheckOutButton person={person} handleCheckOut={handleCheckOut} />
                                        )
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                />
            </div>
        </div>
    );
};
