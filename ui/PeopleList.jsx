import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { CheckInButton, CheckOutButton } from './CheckIn.jsx';
import { SearchInput } from './SearchInput.jsx';
import { Pagination } from './Pagination.jsx';
import { SelectFilter } from './SelectFilter.jsx';

export const PeopleList = ({ people }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [checkInTimes, setCheckInTimes] = useState({});
    const itemsPerPage = 10;

    useEffect(() => {
        const initialCheckInTimes = people.reduce((acc, person) => {
            if (person.checkInDate) {
                acc[person._id] = new Date(person.checkInDate);
            }
            return acc;
        }, {});
        setCheckInTimes(initialCheckInTimes);
    }, [people]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCheckInTimes((prevTimes) => ({ ...prevTimes }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleCheckIn = (personId) => {
        Meteor.call('people.checkIn', personId, (error, result) => {
            if (!error) {
                setCheckInTimes({
                    ...checkInTimes,
                    [personId]: new Date(),
                });
            }
        });
    };

    const handleCheckOut = (personId) => {
        Meteor.call('people.checkOut', personId, (error, result) => {
            if (!error) {
                setCheckInTimes({
                    ...checkInTimes,
                    [personId]: null,
                });
            }
        });
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    const isCheckedInOverFiveSeconds = (personId) => {
        const checkInDate = checkInTimes[personId];
        if (!checkInDate) return false;
        const fiveSecondsAgo = new Date(Date.now() - 5000);
        return checkInDate < fiveSecondsAgo;
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1);
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
                    options={filterOptions} />
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
                                        isCheckedInOverFiveSeconds(person._id) &&
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
